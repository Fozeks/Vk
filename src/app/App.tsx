import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Camera,
  Search,
  Bell,
  Menu,
} from "lucide-react";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

interface Post {
  id: number;
  text: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  shares: number;
  time: string;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      text: `Воскресенье с пользой!

📌15 марта активисты Багаевского района, Софа и Дамир, посетили очное занятие Маяков❤️

На занятии ребята не просто учились — они погрузились в настоящую практику:

• осваивали навыки самостоятельной организации и ответственности
• учились эффективно работать в команде и слышать друг друга
• пробовали себя в роли ведущих, проводя игры на практике
• познакомились с яркими, активными и вдохновляющими ребятами
• сделали важный шаг в понимании того, как работать с детьми

Такие встречи — это не только новые знания, но и вдохновение двигаться дальше 💫
Ребята зарядились опытом, эмоциями и готовы применять всё на практике!

#ПервыеБагаевский
#ДвижениеПервых61
#СоветПевых61`,
      images: [
        "https://images.unsplash.com/photo-1631039302204-c60bb8aa6c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHZvbHVudGVlcnMlMjBjb21tdW5pdHklMjBldmVudCUyMHJ1c3NpYXxlbnwxfHx8fDE3NzUwODI3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1614977102051-66c62b9c8ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx5b3V0aCUyMHZvbHVudGVlcnMlMjBjb21tdW5pdHklMjBldmVudCUyMHJ1c3NpYXxlbnwxfHx8fDE3NzUwODI3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1614977529562-4d73cb0f16f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx5b3V0aCUyMHZvbHVudGVlcnMlMjBjb21tdW5pdHklMjBldmVudCUyMHJ1c3NpYXxlbnwxfHx8fDE3NzUwODI3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      likes: 42,
      shares: 3,
      time: "15 марта в 18:24",
      comments: [
        {
          id: 1,
          author: "Анна Смирнова",
          avatar: "https://i.pravatar.cc/150?img=5",
          text: "Ну и видок у тебя)))",
          time: "18:45",
        },
        {
          id: 2,
          author: "Максим К.",
          avatar: "https://i.pravatar.cc/150?img=12",
          text: "Ты серьёзно это выложила?",
          time: "19:12",
        },
        {
          id: 3,
          author: "Елена Петрова",
          avatar: "https://i.pravatar.cc/150?img=9",
          text: "Лучше бы молчала",
          time: "19:34",
        },
        {
          id: 4,
          author: "Дмитрий",
          avatar: "https://i.pravatar.cc/150?img=15",
          text: "Зачем ты это сделала? Смешно?",
          time: "20:01",
        },
      ],
    },
  ]);

  const [newCommentText, setNewCommentText] = useState<{
    [key: number]: string;
  }>({});
  const [liked, setLiked] = useState<{
    [key: number]: boolean;
  }>({});

  const handleAddComment = (postId: number) => {
    const commentText = newCommentText[postId]?.trim();
    if (!commentText) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: post.comments.length + 1,
            author: "Вы",
            avatar: "https://i.pravatar.cc/150?img=33",
            text: commentText,
            time: "только что",
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      }),
    );

    setNewCommentText({ ...newCommentText, [postId]: "" });
  };

  const handleLike = (postId: number) => {
    setLiked({ ...liked, [postId]: !liked[postId] });
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: liked[postId]
              ? post.likes - 1
              : post.likes + 1,
          };
        }
        return post;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-[#edeef0]">
      {/* Header */}
      <header className="bg-[#4a76a8] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-[1280px] mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl font-semibold">
              ВКонтакте
            </div>
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск"
                className="bg-[#5c82ab] text-white placeholder-gray-300 rounded-full pl-10 pr-4 py-1.5 w-[300px] focus:outline-none focus:bg-white focus:text-gray-900"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 cursor-pointer" />
            <Menu className="w-5 h-5 cursor-pointer md:hidden" />
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-4 p-4">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-[220px] shrink-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <nav className="py-2">
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Моя страница
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Новости
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Мессенджер
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Друзья
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Сообщества
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Фотографии
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Музыка
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Видео
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-[600px] mx-auto w-full">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
            <div className="h-[200px] bg-gradient-to-br from-[#4a76a8] to-[#5c82ab] relative">
              <div className="absolute -bottom-12 left-4">
                <div className="w-[120px] h-[120px] rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                  <img
                    src="https://i.pravatar.cc/150?img=20"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="pt-16 px-4 pb-4">
              <h1 className="text-2xl">София Иванова</h1>
              <p className="text-gray-500 text-sm">онлайн</p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-[#4a76a8] text-white py-2 px-4 rounded-lg hover:bg-[#5c82ab] transition">
                  Написать сообщение
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  День рождения:
                </span>
                <span>15 апреля</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Город:</span>
                <span>Ростов-на-Дону</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Подписчики:
                </span>
                <span>234 человека</span>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src="https://i.pravatar.cc/150?img=20"
                        alt="Sofia"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">
                        София Иванова
                      </div>
                      <div className="text-xs text-gray-500">
                        {post.time}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {post.text}
                  </p>
                </div>

                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-1 gap-1">
                    {post.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Post image ${idx + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="border-t border-gray-100 px-4 py-2 flex items-center justify-between text-sm">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 hover:text-[#4a76a8] transition ${
                      liked[post.id]
                        ? "text-[#ff3347]"
                        : "text-gray-600"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${liked[post.id] ? "fill-current" : ""}`}
                    />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#4a76a8] transition">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#4a76a8] transition">
                    <Share2 className="w-5 h-5" />
                    <span>{post.shares}</span>
                  </button>
                </div>

                {/* Comments Section */}
                <div className="border-t border-gray-100 bg-gray-50">
                  {/* Existing Comments */}
                  {post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex gap-3">
                        <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src={comment.avatar}
                            alt={comment.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-[#f0f2f5] rounded-2xl px-3 py-2 inline-block max-w-full">
                            <div className="font-medium text-sm">
                              {comment.author}
                            </div>
                            <div className="text-sm mt-0.5">
                              {comment.text}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 ml-3">
                            {comment.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Comment */}
                  <div className="px-4 py-3 flex gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src="https://i.pravatar.cc/150?img=33"
                        alt="You"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Написать комментарий..."
                        value={newCommentText[post.id] || ""}
                        onChange={(e) =>
                          setNewCommentText({
                            ...newCommentText,
                            [post.id]: e.target.value,
                          })
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddComment(post.id);
                          }
                        }}
                        className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#4a76a8] transition"
                      />
                      <button
                        onClick={() =>
                          handleAddComment(post.id)
                        }
                        className="text-[#4a76a8] hover:text-[#5c82ab] transition px-3"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block w-[280px] shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-3">Друзья онлайн</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={`https://i.pravatar.cc/150?img=${i}`}
                        alt={`Friend ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="text-sm">Друг {i}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}