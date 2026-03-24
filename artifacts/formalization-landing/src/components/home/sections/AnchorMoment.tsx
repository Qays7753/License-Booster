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
            اعرف الآن وين واقف مشروعك — أربع أسئلة بس.
          </p>
        </div>
      </div>
    </section>
  );
}
