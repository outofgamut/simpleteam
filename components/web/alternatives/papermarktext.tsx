import Link from "next/link";

const PapermarkText = () => {
  return (
    <>
      <div className="mt-16 bg-gray-100 p-8">
        <div className="mx-auto max-w-3xl space-y-6 rounded-lg bg-white p-6 text-black shadow-sm">
          <h1 className="text-4xl font-bold ">DocSend vs Simpleteam</h1>
          <p className="mb-4">
            Simpleteam emphasizes security and user interface, offering features
            like watermarking, password protection, and custom branding.
          </p>

          <ul className="mb-4 list-inside list-disc">
            <li className="">Founder First</li>
            <li className="">Budget Friendly</li>
            <li className="">Open Source</li>
            <li className="">User-Friendly </li>
          </ul>
          <p className="mb-4">
            <a
              href="https://github.com/mfts/papermark"
              className="px-2 text-blue-600 underline"
            >
              Self-host Papermark
            </a>
            or let us host it for you
            <Link href="/login" className="px-2 text-blue-600 underline">
              for free
            </Link>
          </p>
          <h2 className="mt-4 text-2xl font-bold">Simpleteam reviews</h2>

          <p>⭐️⭐️⭐️⭐️⭐️</p>

          <h3 className="font-semi-bold mt-4 text-2xl">
            Users love our customer support
          </h3>
          <img
            src="https://assets.simpleteam.co/alterantives/ptam9dpuu627c1hmsttz.png"
            alt="Simpleteam reviews"
            className="my-4"
          />
          <h3 className="font-semi-bold mt-4 text-2xl">
            Simpleteam focuses on UI and core features
          </h3>
          <img
            src="https://assets.simpleteam.co/alterantives/rukw13d22o50hfrdqa1y.png"
            alt="Simpleteam reviews"
            className="my-4"
          />
          <h3 className="font-semi-bold mt-4 text-2xl">
            Actively used by founders, VC funds and developers
          </h3>
          <img
            src="https://assets.simpleteam.co/alterantives/6gsr6kfo84srtzgu6nhe.png"
            alt="Simpleteam reviews"
            className="my-4"
          />
          <h2 className="mt-4 text-2xl font-bold">
            Simpleteam plans and pricing
          </h2>
          <p>
            Simpleteam has a simple pricing structure. You can use Simpleteam for
            free or get the the subscribtion to your team for more advanced
            features. Including custom domain. We also respond on custom
            requests. As Simpleteam is open source first you can host it
            yourself.
          </p>

          <img
            src="https://assets.simpleteam.co/alterantives/fibyns1yrayocc2pkydk.png"
            alt="Simpleteam plans and pricing"
            className="my-4"
          />

          <p>
            Simpleteam is a founder frinedly alternative to Docsend. Our team
            focuses on delivering value fast and supporting each customer.
          </p>
        </div>
      </div>
    </>
  );
};

export default PapermarkText;
