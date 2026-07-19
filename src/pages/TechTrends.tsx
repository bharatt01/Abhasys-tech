import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import BlogCard from "@/components/blog/BlogCard";
import { blogs as dummyBlogs } from "@/lib/blogs";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200";

export default function TechTrends() {
  const [blogs] = useState(dummyBlogs);

  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(blogs.map((blog) => blog.category)),
    ];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" ||
        blog.category === activeCategory;

      const matchesSearch =
        blog.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        blog.excerpt
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, activeCategory, search]);

  const featuredBlog = filteredBlogs.find(
    (blog) => blog.featured
  );

  const remainingBlogs = filteredBlogs.filter(
    (blog) => !blog.featured
  );

  return (
    <div className="overflow-hidden bg-white">

      <Navbar />

      {/* ---------------- HERO ---------------- */}

      <section className="relative overflow-hidden pt-40 pb-24">

        <div className="absolute inset-0">

          <div className="absolute -top-44 right-[-150px] h-[450px] w-[450px] rounded-full bg-indigo-600/5 blur-3xl" />

          <div className="absolute -bottom-52 left-[-120px] h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

        </div>

        <div className="relative mx-auto max-w-7xl px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-bold text-white">

              <TrendingUp size={18} />

              Tech Trends

            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 max-w-5xl text-6xl font-black leading-none md:text-7xl lg:text-8xl"
          >
            What's Shaping

            <br />

            <span className="text-indigo-600">
              Tomorrow's Tech
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            className="mt-8 max-w-3xl text-xl leading-8 text-gray-600"
          >
            Explore insights on Artificial Intelligence,
            Cloud Computing, React, Cyber Security,
            Startups and Modern Software Engineering.
          </motion.p>

          {/* Search */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
            className="relative mt-14 max-w-xl"
          >

            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-full border border-gray-200 py-4 pl-14 pr-5 outline-none transition-all focus:border-indigo-600"
            />

          </motion.div>

          {/* Categories */}

          <div className="mt-10 flex flex-wrap gap-3">

            {categories.map((category) => (

              <button
                key={category}
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all

                ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }

                `}
              >
                {category}
              </button>

            ))}

          </div>

        </div>

      </section>

      {/* ---------------- CONTENT ---------------- */}

      <section className="pb-32">

        <div className="mx-auto max-w-7xl px-6">

          {/* Featured Blog */}

          {featuredBlog && (

            <Link
              to={`/tech-trends/${featuredBlog.slug}`}
            >

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="group mb-20 overflow-hidden rounded-3xl border border-black/10"
              >

                <div className="grid md:grid-cols-2">

                  <div className="overflow-hidden">

                    <img
                      src={
                        featuredBlog.coverImage ||
                        FALLBACK_IMAGE
                      }
                      alt={featuredBlog.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                  </div>

                  <div className="flex flex-col justify-center bg-black p-14 text-white">

                    <span className="w-fit rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold">

                      {featuredBlog.category}

                    </span>

                    <h2 className="mt-7 text-4xl font-black leading-tight">

                      {featuredBlog.title}

                    </h2>

                    <p className="mt-6 leading-8 text-white/70">

                      {featuredBlog.excerpt}

                    </p>

                    <div className="mt-10 flex items-center gap-3 font-bold text-indigo-400">

                      Read Article

                      <ArrowUpRight />

                    </div>

                  </div>

                </div>

              </motion.div>

            </Link>

          )}

          {/* Section Heading */}

          <div className="mb-10 flex items-center justify-between">

            <div>

              <h2 className="text-4xl font-black">

                Latest Articles

              </h2>

              <p className="mt-2 text-gray-600">

                Stay updated with the latest technology
                insights.

              </p>

            </div>

            <div className="rounded-full bg-black px-5 py-2 text-white">

              {filteredBlogs.length} Articles

            </div>

          </div>

          {/* Grid */}

          {remainingBlogs.length === 0 ? (

            <div className="py-24 text-center">

              <h3 className="text-3xl font-bold">

                No Articles Found

              </h3>

              <p className="mt-4 text-gray-500">

                Try another category or search.

              </p>

            </div>

          ) : (

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {remainingBlogs.map((blog) => (

                <BlogCard
                  key={blog.id}
                  blog={blog}
                />

              ))}

            </div>

          )}

        </div>

      </section>

      <Footer />

    </div>
  );
}