# Real-Time Collaborative Document Editor

A **Google Docs Clone** built using **Next.js, TipTap, Liveblocks, Convex, and Clerk** for seamless real-time document editing and collaboration.

## 🚀 Features

✅ **Real-Time Collaboration** – Edit documents simultaneously with live updates.  
✅ **TipTap Editor** – Rich-text editing with formatting, images, and more.  
✅ **Liveblocks for Presence** – Track users in real-time and see cursor positions.  
✅ **Convex as a Real-Time Database** – Ensures fast and scalable synchronization.  
✅ **User Authentication with Clerk** – Secure login and document access.  
✅ **Autosave & Versioning** – Prevents data loss and tracks document changes.  

## 🛠 Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS  
- **Editor:** TipTap  
- **Collaboration:** Liveblocks  
- **Database:** Convex  
- **Authentication:** Clerk  

## 📌 Installation & Setup

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/Mnkubusb/docs.git
   cd docs
   ```
2. **Install dependencies:**  
   ```sh
   npm install
   ```
3. **Set up environment variables:**  
   Create a `.env.local` file and add the necessary API keys:
   ```sh
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_key
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```
4. **Run the development server:**  
   ```sh
   npm run dev
   ```
5. **Open in browser:**  
   Visit `http://localhost:3000`

## 📷 Screenshots

![Demo](/public/screenshots/network.png)

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/)
- [TipTap Editor](https://tiptap.dev/)
- [Liveblocks](https://liveblocks.io/)
- [Convex](https://convex.dev/)
- [Clerk](https://clerk.dev/)

