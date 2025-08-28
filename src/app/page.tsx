"use client";

import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LandingPage() {
  const steps = [
    {
      num: "1",
      text: "Masukkan data laptop (harga, RAM, storage, prosesor).",
    },
    {
      num: "2",
      text: "Sistem menghitung skor dengan metode pembobotan.",
    },
    {
      num: "3",
      text: "Laptop ditampilkan dari skor tertinggi ke terendah.",
    },
    {
      num: "4",
      text: "Kamu bisa langsung melihat rekomendasi terbaik.",
    },
  ];

  return (
    <main className={`${poppins.className} min-h-screen bg-white`}>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#446BA6] px-14">
        <div className="max-w-7xl mx-auto py-5 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            RankLaptop
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="#features" className="text-white hover:text-[#b7d4ff]">
              Fitur
            </Link>
            <Link href="#steps" className="text-white hover:text-[#b7d4ff]">
              Cara Kerja
            </Link>
            <Link href="/ranking" className="text-white hover:text-[#b7d4ff]">
              Lihat Ranking
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex relative pt-8 items-center pb-24 justify-between bg-[#446BA6] text-left px-14">
        <div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-[#b7d4ff]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Cari Laptop Terbaik dengan{" "}
            <span className="text-white">RankLaptop</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-white max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Website ini membantu kamu memilih laptop terbaik berdasarkan harga,
            RAM, storage, dan prosesor menggunakan metode pembobotan modern.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/ranking"
              className="px-6 py-3 bg-[#b7d4ff] text-[#446BA6] rounded-2xl shadow hover:bg-blue-700 transition"
            >
              Lihat Ranking Laptop
            </Link>
          </motion.div>
        </div>
        <Image
          src="/images/device.svg"
          alt="hero"
          height={100}
          width={100}
          className="w-xl"
        />
        {/* Features Section */}
        <div
          id="features"
          className="pb-16 px-24 absolute -bottom-[345px] left-1/2 -translate-1/2 w-full"
        >
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto rounded-2xl py-3 bg-[#284B7B]">
            {[
              {
                title: "Akurasi Tinggi",
                desc: "Ranking dihitung dengan metode pembobotan modern.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-10 h-10 text-[#b7d4ff]"
                  >
                    <path
                      fill="#b7d4ff"
                      d="M128 128C128 110.3 113.7 96 96 96C78.3 96 64 110.3 64 128L64 464C64 508.2 99.8 544 144 544L544 544C561.7 544 576 529.7 576 512C576 494.3 561.7 480 544 480L144 480C135.2 480 128 472.8 128 464L128 128zM534.6 214.6C547.1 202.1 547.1 181.8 534.6 169.3C522.1 156.8 501.8 156.8 489.3 169.3L384 274.7L326.6 217.4C314.1 204.9 293.8 204.9 281.3 217.4L185.3 313.4C172.8 325.9 172.8 346.2 185.3 358.7C197.8 371.2 218.1 371.2 230.6 358.7L304 285.3L361.4 342.7C373.9 355.2 394.2 355.2 406.7 342.7L534.7 214.7z"
                    />
                  </svg>
                ),
              },
              {
                title: "Transparan",
                desc: "Setiap skor dihitung dari harga, RAM, storage, dan prosesor.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-10 h-10 text-[#b7d4ff]"
                  >
                    <path
                      fill="#b7d4ff"
                      d="M175.3 160C161.3 160 148.8 169.2 144.7 182.6L102.4 320L256 320C273.7 320 288 334.3 288 352L352 352C352 334.3 366.3 320 384 320L537.6 320L495.3 182.6C491.2 169.2 478.8 160 464.7 160L432 160C414.3 160 400 145.7 400 128C400 110.3 414.3 96 432 96L464.7 96C506.8 96 544.1 123.5 556.5 163.8L601.9 311.3C606 324.5 608 338.2 608 352L608 448C608 501 565 544 512 544L448 544C395 544 352 501 352 448L352 416L288 416L288 448C288 501 245 544 192 544L128 544C75 544 32 501 32 448L32 352C32 338.2 34.1 324.5 38.1 311.3L83.5 163.8C95.9 123.5 133.1 96 175.3 96L208 96C225.7 96 240 110.3 240 128C240 145.7 225.7 160 208 160L175.3 160zM96 384L96 448C96 465.7 110.3 480 128 480L192 480C209.7 480 224 465.7 224 448L224 384L96 384zM512 480C529.7 480 544 465.7 544 448L544 384L416 384L416 448C416 465.7 430.3 480 448 480L512 480z"
                    />
                  </svg>
                ),
              },
              {
                title: "Mudah Digunakan",
                desc: "Interface sederhana, hasil jelas dan cepat.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-10 h-10 text-[#b7d4ff]"
                  >
                    <path
                      fill="#b7d4ff"
                      d="M128 96C92.7 96 64 124.7 64 160L64 400L128 400L128 160L512 160L512 400L576 400L576 160C576 124.7 547.3 96 512 96L128 96zM19.2 448C8.6 448 0 456.6 0 467.2C0 509.6 34.4 544 76.8 544L563.2 544C605.6 544 640 509.6 640 467.2C640 456.6 631.4 448 620.8 448L19.2 448z"
                    />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#b7d4ff]">
                  {item.title}
                </h3>
                <p className="mt-1 text-white">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="#steps" className="pb-20 pt-40 px-6 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-[#284B7B]">
          Bagaimana Cara Kerjanya?
        </h2>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white border border-[#284B7B] shadow-lg rounded-2xl p-6 w-64 flex flex-col items-center justify-center text-center"
            >
              <div className="flex items-center justify-center flex-shrink-0 text-lg font-bold text-white bg-[#284B7B] rounded-2xl w-12 h-12 mb-4">
                {step.num}
              </div>

              <p className="text-gray-700">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-14 text-white">
        <div className="flex justify-between gap-10 rounded-3xl bg-[#284B7B] p-14 items-center ">
          {" "}
          <div className="text-left">
            <h2 className="text-3xl md:textdiv-4xl font-bold">
              Siap Cari Laptop Terbaikmu?
            </h2>
            <p className="mt-4 text-lg">
              Mulai sekarang dan temukan rekomendasi laptop sesuai kebutuhanmu.
            </p>
            <div className="mt-8">
              <Link
                href="/ranking"
                className="px-6 py-3 bg-white text-[#284B7B] rounded-2xl font-semibold shadow hover:bg-gray-100 transition"
              >
                Cek Ranking Laptop
              </Link>
            </div>
          </div>
          <Image
            src="/images/check.svg"
            alt="hero"
            height={100}
            width={100}
            className="w-xl"
          />
        </div>
      </section>
      <footer className="bg-[#446BA6] text-white py-6">
        <div className="text-center px-14">
          <p>
            &copy; {new Date().getFullYear()} RankLaptop. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
