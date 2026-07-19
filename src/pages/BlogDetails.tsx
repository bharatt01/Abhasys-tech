import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  ArrowUpRight,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
getBlogs
}
from "@/services/blogService";

const [blogs,setBlogs]=useState([]);
useEffect(()=>{

loadBlogs();

},[]);



async function loadBlogs(){

const data =
await getBlogs();

setBlogs(data);

}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200";


export default function BlogDetails() {

  const { slug } = useParams();


  const blog = useMemo(() => {
    return blogs.find(
      (item) => item.slug === slug
    );
  }, [slug]);


  const relatedBlogs = useMemo(() => {

    if (!blog) return [];

    return blogs
      .filter(
        (item) =>
          item.category === blog.category &&
          item.id !== blog.id
      )
      .slice(0,3);

  }, [blog]);



  if (!blog) {

    return (

      <>

        <Navbar />

        <div className="min-h-screen flex flex-col items-center justify-center">

          <h1 className="text-5xl font-black">
            Article Not Found
          </h1>


          <Link
            to="/tech-trends"
            className="mt-8 rounded-full bg-indigo-600 px-6 py-3 text-white font-bold"
          >

            Back To Tech Trends

          </Link>


        </div>

        <Footer />

      </>

    );

  }



  return (

    <div className="bg-white">

      <Navbar />


      <main className="pt-36">


        {/* HERO */}

        <section className="max-w-5xl mx-auto px-6">


          <Link
            to="/tech-trends"
            className="
            inline-flex 
            items-center 
            gap-2 
            font-semibold 
            text-indigo-600
            "
          >

            <ArrowLeft size={18}/>

            Back to articles

          </Link>



          <div className="mt-10">


            <span
              className="
              rounded-full 
              bg-indigo-600 
              px-4 
              py-2 
              text-xs 
              font-bold 
              text-white
              "
            >

              {blog.category}

            </span>


            <h1
              className="
              mt-8
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              "
            >

              {blog.title}

            </h1>



            <p
              className="
              mt-6
              text-xl
              text-gray-600
              leading-8
              "
            >

              {blog.excerpt}

            </p>



            {/* META */}


            <div
              className="
              mt-10
              flex
              flex-wrap
              gap-6
              text-gray-500
              "
            >


              <span className="flex items-center gap-2">

                <User size={18}/>

                {blog.author}

              </span>



              <span className="flex items-center gap-2">

                <Calendar size={18}/>

                {blog.createdAt}

              </span>



              <span className="flex items-center gap-2">

                <Clock size={18}/>

                {blog.readTime} min read

              </span>



            </div>


          </div>


        </section>





        {/* COVER IMAGE */}


        <section className="max-w-7xl mx-auto px-6 mt-16">


          <div
            className="
            overflow-hidden
            rounded-[32px]
            "
          >

            <img
              src={
                blog.coverImage ||
                FALLBACK_IMAGE
              }
              alt={blog.title}
              className="
              w-full
              h-[550px]
              object-cover
              "
            />

          </div>


        </section>







        {/* CONTENT AREA */}



        <section
          className="
          max-w-5xl
          mx-auto
          px-6
          mt-20
          "
        >


          <article
            className="
            prose
            prose-lg
            max-w-none
            prose-headings:font-black
            prose-p:text-gray-700
            "
          >


            {blog.content
              .split("\n")
              .filter(Boolean)
              .map(
                (paragraph,index)=>(

                <p
                  key={index}
                  className="
                  text-lg
                  leading-9
                  mb-8
                  "
                >

                  {paragraph}

                </p>

              ))}



          </article>



        </section>






        {/* RELATED */}



        {
          relatedBlogs.length > 0 &&

          <section
            className="
            max-w-7xl
            mx-auto
            px-6
            mt-32
            pb-32
            "
          >


            <h2
              className="
              text-4xl
              font-black
              mb-12
              "
            >

              Related Articles

            </h2>



            <div
              className="
              grid
              md:grid-cols-3
              gap-8
              "
            >


              {
                relatedBlogs.map(item=>(


                  <Link
                    key={item.id}
                    to={`/tech-trends/${item.slug}`}
                  >


                    <div
                      className="
                      group
                      rounded-3xl
                      overflow-hidden
                      border
                      border-black/10
                      hover:shadow-xl
                      transition
                      "
                    >


                      <img

                        src={
                          item.coverImage ||
                          FALLBACK_IMAGE
                        }

                        className="
                        h-56
                        w-full
                        object-cover
                        group-hover:scale-105
                        transition
                        duration-700
                        "

                        alt={item.title}

                      />



                      <div
                        className="
                        p-6
                        "
                      >


                        <span
                          className="
                          text-xs
                          font-bold
                          text-indigo-600
                          "
                        >

                          {item.category}

                        </span>



                        <h3
                          className="
                          mt-3
                          text-xl
                          font-bold
                          group-hover:text-indigo-600
                          "
                        >

                          {item.title}

                        </h3>


                        <div
                          className="
                          mt-5
                          flex
                          items-center
                          gap-2
                          font-semibold
                          "
                        >

                          Read

                          <ArrowUpRight size={16}/>


                        </div>


                      </div>


                    </div>


                  </Link>


                ))
              }


            </div>


          </section>

        }


      </main>


      <Footer/>


    </div>

  );

}