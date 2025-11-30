import { useState, useEffect } from 'react';
import { Hourglass } from 'lucide-react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: Date | string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const timeUnits = [
    { label: 'Days', value: timeRemaining.days },
    { label: 'Hours', value: timeRemaining.hours },
    { label: 'Minutes', value: timeRemaining.minutes },
    { label: 'Seconds', value: timeRemaining.seconds },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Countdown Label */}
      <motion.h3
        className="font-inter text-white text-sm sm:text-base font-semibold tracking-widest-xl uppercase mb-6 sm:mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Countdown
      </motion.h3>

      {/* Timer Display */}
      <div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4"
        role="timer"
        aria-live="polite"
        aria-label={`Time remaining: ${timeRemaining.days} days, ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes, ${timeRemaining.seconds} seconds`}
      >
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center">
            {/* Time Unit Container */}
            <motion.div
              className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Number Display - No background, festival color fill */}
              <div className="relative">
                <motion.span
                  key={unit.value}
                  className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-festival-gold leading-none tabular-nums"
                  style={{ fontFamily: 'var(--font-family-sansita)' }}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {formatNumber(unit.value)}
                </motion.span>
              </div>

              {/* Unit Label */}
              <span className="font-inter text-white/80 text-xs sm:text-sm mt-2 lowercase">
                {unit.label}
              </span>
            </motion.div>

            {/* Colon Separator */}
            {index < timeUnits.length - 1 && (
              <span className="text-festival-gold/70 text-4xl sm:text-5xl md:text-6xl font-bold mx-1 sm:mx-2 pb-6">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Hourglass Icon */}
      <motion.div
        className="mt-8 sm:mt-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Hourglass
            className="w-20 h-20 sm:w-28 sm:h-28 text-festival-light-gold"
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;
