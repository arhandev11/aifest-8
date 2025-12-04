import LicensesModal from "@/components/LicensesModal";
import { useState } from "react";

const Footer = () => {
  const [isLicensesOpen, setIsLicensesOpen] = useState(false);

  const scrollToFAQ = () => {
    const faqSection = document.getElementById("faq");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="bg-black/80 border-t border-festival-gold/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p
              className="text-gray-400 text-sm text-center sm:text-left"
              style={{ fontFamily: "var(--font-family-lora)" }}
            >
              &copy; {new Date().getFullYear()} AIFest 8.0 - Aisyah Festival.
              All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {/* FAQ */}
              <button
                onClick={scrollToFAQ}
                className="text-gray-400 hover:text-festival-gold text-sm transition-colors"
                style={{ fontFamily: "var(--font-family-lora)" }}
              >
                FAQ
              </button>

              {/* About Application */}
              <button
                onClick={() => setIsLicensesOpen(true)}
                className="text-gray-400 hover:text-festival-gold text-sm transition-colors"
                style={{ fontFamily: "var(--font-family-lora)" }}
              >
                Tentang Aplikasi
              </button>
            </div>
          </div>
        </div>
      </footer>

      <LicensesModal
        isOpen={isLicensesOpen}
        onClose={() => setIsLicensesOpen(false)}
      />
    </>
  );
};

export default Footer;
