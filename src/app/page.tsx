"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useReward } from "react-rewards";
import dayjs from "dayjs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const validDate = () => {
    if (dayjs().isAfter("2023-07-24") || dayjs("2023-07-24")) return true;
    return false;
  };

  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (validDate())
      setInterval(() => {
        isAnimating === true;
        reward();
      }, 2000);
    const interval = setInterval(() => {
      const countDownDate = new Date("July 24, 2023 00:00:00").getTime();
      const now = new Date().getTime();
      const distance = countDownDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      {/* {validDate() ? (
        <>
          <div className="text-2xl font-semibold">She is back!</div>
          <div className="text-4xl font-bold text-center">Tomáš is Back!</div>
          <span onClick={reward} className="absolute bottom-36">
            <span id="rewardId" />
          </span>
        </>
      ) : (
        <> */}
      <h1 className="text-3xl font-bold mb-4">Tomáš will be back in:</h1>
      <div className="flex gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold">{countdown.days}</p>
          <p className="text-sm">Days</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold">{countdown.hours}</p>
          <p className="text-sm">Hours</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold">{countdown.minutes}</p>
          <p className="text-sm">Minutes</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold">{countdown.seconds}</p>
          <p className="text-sm">Seconds</p>
        </div>
      </div>
      {/* </>
      )} */}
    </div>
  );
}
