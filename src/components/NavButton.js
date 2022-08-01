import Router from "next/router";
//In works-- if i ever need--  might not use -- might not even work
export default function NavButton({ path, label }) {
  return (
    <>
      <button
        className="mt-2 text-h2-mobile md:text-h2-medium lg:text-h2-large bg-primary-bg"
        onClick={() => {
          Router.push({ path });
        }}
        label={label}
      />
    </>
  );
}
