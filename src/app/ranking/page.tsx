"use client";
import { useState } from "react";
import { topsis } from "@/app/topsis";
import { Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// tipe untuk laptop yang dimasukkan user
type Laptop = {
  name: string;
  processor: string;
  criteria: number[];
};

// tipe untuk hasil topsis
type RankingResult = {
  name: string;
  score: number;
};
export default function Ranking() {
  const [alternatives, setAlternatives] = useState<Laptop[]>([]);
  const [name, setName] = useState("");
  const [harga, setHarga] = useState<number | "">("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState<number | "">("");
  const [processor, setProcessor] = useState("Intel Core i3");
  const [result, setResult] = useState<RankingResult[]>([]);
  const [showModal, setShowModal] = useState(false);

  const processorValue: Record<string, number> = {
    "Intel Core i3": 1,
    "Intel Core i5": 2,
    "Intel Core i7": 3,
    "Intel Core i9": 4,
    "AMD Ryzen 5": 2,
    "AMD Ryzen 7": 3,
  };

  const formatNumber = (value: number | "") =>
    value === "" ? "" : new Intl.NumberFormat("id-ID").format(value);

  const parseNumber = (value: string) =>
    value.replace(/\./g, "") === ""
      ? ""
      : parseInt(value.replace(/\./g, ""), 10);

  const addAlternative = () => {
    if (!name || harga === "" || !ram || storage === "") return;

    setAlternatives([
      ...alternatives,
      {
        name,
        processor,
        criteria: [
          Number(harga),
          parseFloat(ram),
          Number(storage),
          processorValue[processor] || 1,
        ],
      },
    ]);
    setName("");
    setHarga("");
    setRam("");
    setStorage("");
    setProcessor("Intel Core i3");
  };

  const calculate = () => {
    const weights = [0.4, 0.25, 0.2, 0.15]; // harga, ram, storage, processor
    const impacts: ("+" | "-")[] = ["-", "+", "+", "+"];
    setResult(topsis(alternatives, weights, impacts));
    setShowModal(true);
  };
  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <main className={`${poppins.className} min-h-screen bg-white`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-14">
        <div className="max-w-7xl mx-auto py-5 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            RankLaptop
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-[#b7d4ff]">
              Beranda
            </Link>
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

      {/* Hero */}
      <section className="relative pt-48 pb-40 items-center  bg-[#446BA6] text-center px-14">
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
            className="mt-6 text-lg text-white text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Website ini membantu kamu memilih laptop terbaik berdasarkan harga,
            RAM, storage, dan prosesor menggunakan metode pembobotan modern.
          </motion.p>
        </div>
        <Image
          src="/images/hero-1.svg"
          alt="hero"
          height={100}
          width={100}
          className="w-full absolute top-0 left-0 z-40"
        />
      </section>

      <section className="px-14 py-16 bg-gray-50  ">
        {/* Data Laptop */}
        {alternatives.length > 0 && (
          <div className=" mx-auto mb-12 ">
            <h2 className="text-xl font-bold text-[#446BA6] flex justify-center items-center gap-2 mb-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              Data Laptop
            </h2>
            <div className="grid md:grid-cols-2 gap-6 ">
              {alternatives.map((alt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-[#446BA6] shadow-lg rounded-xl p-6"
                >
                  <h3 className="font-semibold text-lg text-gray-900">
                    {alt.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{alt.processor}</p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      Harga: {formatCurrency(alt.criteria[0])}
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                        />
                      </svg>
                      RAM: {alt.criteria[1]} GB
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                        />
                      </svg>
                      Storage: {alt.criteria[2].toLocaleString("id-ID")} GB
                    </li>
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className=" mx-auto bg-white shadow-lg text-[#446BA6] rounded-2xl py-8 px-14 border border-[#446BA6]">
          <h2 className="text-2xl font-bold text-[#446BA6] mb-6 text-center">
            Tambah Data Laptop
          </h2>
          <div className="grid gap-4">
            <label className="font-medium">Nama Laptop</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Asus Vivobook"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-[#446BA6] border-[#446BA6] outline-none"
            />
            <label className="font-medium">Harga (Rp)</label>
            <input
              value={formatNumber(harga)}
              onChange={(e) => setHarga(parseNumber(e.target.value))}
              placeholder="Contoh: 10.000.000"
              inputMode="numeric"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-[#446BA6] border-[#446BA6] outline-none"
            />
            <label className="font-medium">RAM (GB)</label>
            <input
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              placeholder="Contoh: 16"
              type="number"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-[#446BA6] border-[#446BA6] outline-none"
            />
            <label className="font-medium">Storage (GB)</label>
            <input
              value={formatNumber(storage)}
              onChange={(e) => setStorage(parseNumber(e.target.value))}
              placeholder="Contoh: 512"
              inputMode="numeric"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-[#446BA6] border-[#446BA6] outline-none"
            />
            <label className="font-medium">Processor</label>
            <select
              value={processor}
              onChange={(e) => setProcessor(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-[#446BA6] border-[#446BA6] outline-none"
            >
              <option>Intel Core i3</option>
              <option>Intel Core i5</option>
              <option>Intel Core i7</option>
              <option>Intel Core i9</option>
              <option>AMD Ryzen 5</option>
              <option>AMD Ryzen 7</option>
            </select>
            <button
              onClick={addAlternative}
              className="bg-[#b7d4ff] border border-[#446BA6] text-[#446BA6] flex justify-center gap-2 items-center px-4 py-3 rounded-xl shadow-md transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Tambah Laptop
            </button>
          </div>
        </div>

        {/* Tombol Hitung */}
        {alternatives.length > 1 && (
          <div className="text-center mt-6">
            <button
              onClick={calculate}
              className="bg-[#446BA6] hover:bg-[#36588A] w-full flex justify-center items-center gap-2 text-white px-6 py-3 rounded-xl shadow-md transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                />
              </svg>
              Hitung Ranking
            </button>
          </div>
        )}
      </section>

      {/* Modal Hasil Ranking */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl justify-center shadow-2xl p-8 max-w-2xl w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <Image
                src="/images/winners.svg"
                alt="hero"
                height={100}
                width={100}
                className="w-72 mx-auto"
              />

              <h2 className="text-2xl font-bold text-[#446BA6] mb-6 text-center">
                Hasil Ranking Laptop
              </h2>
              <ol className="space-y-4">
                {result.map((r, i) => {
                  const alt = alternatives.find((a) => a.name === r.name);
                  return (
                    <li
                      key={i}
                      className={`p-5 rounded-xl shadow-md flex items-center justify-between ${
                        i === 0
                          ? "bg-yellow-100 border-2 border-yellow-400"
                          : "bg-gray-50 border"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-lg text-gray-900">
                          {i + 1}. {r.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {alt?.processor}
                        </p>
                      </div>
                      <span className="text-[#446BA6] font-bold">
                        Skor: {r.score.toFixed(4)}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-[#446BA6] text-white px-6 py-2 rounded-xl shadow hover:bg-[#36588A]"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
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
