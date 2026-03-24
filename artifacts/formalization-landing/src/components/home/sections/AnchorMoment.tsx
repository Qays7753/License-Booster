import { motion } from "framer-motion";

export function AnchorMoment() {
  return (
    <section className="bg-[#f8efe4] py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold leading-relaxed text-foreground md:text-5xl"
          >
            قبل الترخيص تبيع على الثقة، وبعده تبيع على الوضوح.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-2 text-3xl font-bold leading-relaxed text-foreground md:text-5xl"
          >
            الذي يعرفك قد يشتري منك مرة، لكن وضوح وضع مشروعك يساعدك تكمل مع ناس
            لا يعرفونك من قبل.
          </motion.p>
          <div className="mx-auto mt-10 max-w-3xl">
            <img
              src="/images/anchor-moment.png"
              alt="رسم توضيحي يعبّر عن الانتقال من البيع لمن يعرفك إلى البيع لمن لا يعرفك"
              className="w-full rounded-3xl"
              width="800"
              height="400"
              loading="lazy"
            />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
            بعدما قربت الصورة، بقي أن تعرف أين يقف مشروعك اليوم حتى لا تبدأ من
            خطوة لا تناسبك.
          </p>
        </div>
      </div>
    </section>
  );
}
