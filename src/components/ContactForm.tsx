"use client";

export default function ContactForm() {
  return (
    <form className="divide-y divide-white/10">

      <Field index="01" label="What’s your name?" placeholder="Your full name" />
      <Field index="02" label="What’s your email?" placeholder="you@email.com" />
      <Field index="03" label="Organization name?" placeholder="Company or brand" />
      <Field index="04" label="What do you need help with?" placeholder="Describe briefly" />

      {/* MESSAGE */}
      <div className="py-10">
        <p className="text-sm text-neutral-300 mb-3">05 &nbsp; Your message</p>
        <textarea
          rows={4}
          placeholder="Write your message here..."
          className="w-full bg-transparent text-sm outline-none resize-none
                     placeholder:text-neutral-600"
        />
      </div>

      {/* SUBMIT */}
      <div className="pt-10 flex justify-end">
        <button
          type="submit"
          className="
            px-10 py-3 rounded-full text-sm font-medium
            bg-sky-500 text-black
            transition-all duration-300
            hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]
            active:scale-95
          "
        >
          Send It
        </button>
      </div>
    </form>
  );
}

function Field({ index, label, placeholder }: any) {
  return (
    <div className="py-10">
      <p className="text-sm text-neutral-300 mb-3">
        {index} &nbsp; {label}
      </p>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none
                   placeholder:text-neutral-600"
      />
    </div>
  );
}
