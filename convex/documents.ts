import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { redirect } from "next/navigation";


export const getByIds = query({
  args: { ids: v.array(v.id("documents")) },
  handler: async (ctx, { ids }) => {
    const documents = [];

    for (const id of ids) {
      const document = await ctx.db.get(id);
      if (document) {
        documents.push({ id: document._id, name: document.title });
      }else{
        documents.push({ id, name: "Document is Deleted" });
      }
    }

    return documents;
  }
})


export const create = mutation({
  args : { title: v.optional(v.string()) , initialContent: v.optional(v.string()) },
  handler : async ( ctx , args )=> {
    const user = await ctx.auth.getUserIdentity();
    
    if(!user){
       throw new ConvexError("Unauthorized");
    }

    const organisationId = (user.organisation_id ?? undefined) as 
    | string
    | undefined ;

    const documentId = await ctx.db.insert( "documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      organisationId,
      initialContent: args.initialContent,
    });

    return documentId
  },
});


export const get = query({
    args : { paginationOpts: paginationOptsValidator , search : v.optional(v.string())},
    handler: async (ctx ,{ paginationOpts , search }) => {

      const user = await ctx.auth.getUserIdentity();

      if(!user){
        throw new ConvexError("Unauthorized");
      }

      const organisationId = (user.organisation_id ?? undefined) as 
       | string
       | undefined ;

      if( search && organisationId ) {
        return await ctx.db
          .query("documents")
          .withSearchIndex("search_title" , (q) => 
              q.search("title" , search).eq("organisationId" , organisationId)
          )
          .paginate(paginationOpts)
      }

      if(search){
        return await ctx.db
          .query("documents")
          .withSearchIndex("search_title", (q) => q.search("title" ,search).eq("ownerId" , user.subject))
          .paginate(paginationOpts);
      }

      if(organisationId){
        return await ctx.db
        .query("documents")
        .withIndex("by_organisational_id" , (q) => q.eq("organisationId" , organisationId))
        .paginate(paginationOpts);
      }

      return await ctx.db
        .query("documents")
        .withIndex("by_owner_id" , (q) => q.eq("ownerId" , user.subject))
        .paginate(paginationOpts);
    },
  });

  export const removeById = mutation({
    args: { id: v.id("documents") },
    handler: async ( ctx , args ) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user){
          throw new ConvexError("Unauthorized");
        }

        const document = await ctx.db.get(args.id);
        
        if(!document){
          throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        
        if(!isOwner){
          throw new ConvexError("Unauthorized");
        }

        return await ctx.db.delete(args.id);
    }
  })

  export const updateById = mutation({
    args: { id: v.id("documents"), title: v.optional(v.string())},
    handler: async ( ctx , args ) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user){
          throw new ConvexError("Unauthorized");
        }
        const organisationId = (user.organisation_id ?? undefined) as 
           | string
           | undefined ;

        const document = await ctx.db.get(args.id);
        
        if(!document){
          throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        const isOrganisationMember = !!(document.organisationId && document.organisationId === organisationId);
        
        if(!isOwner && !isOrganisationMember){
          throw new ConvexError("Unauthorized");
        }

        return await ctx.db.patch(args.id , { title: args.title });
    }
  });


  export const getById = query({
    args: { id: v.id("documents") },
    handler: async(ctx , { id }) => {
      const document = await ctx.db.get(id);

      if(!document){
        throw new ConvexError("Document not found");
      }
      return document;
    }
  })