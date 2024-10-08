export default function ContactUs() {
  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12  bg-[url('/bg-pattern.png')] bg-no-repeat bg-bottom bg-contain lg:bg-cover bg-fixed bg-muted/45 ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#189597] to-[#18977F] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-muted/80 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="text-center pb-6">
            <h1 className="text-3xl">Contact Us!</h1>
            <p className="">Fill up the form below to send us a message.</p>
          </div>
          <form>
            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              name="name"
            />
            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Subject"
              name="_subject"
            />
            <textarea
              className="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              //   type="text"
              placeholder="Type your message here..."
              name="message"
              style={{ height: 121 }}
              defaultValue={""}
            />
            <div className="flex justify-between">
              <input
                className="shadow bg-[#FF9601] hover:bg-[#ffb701] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                defaultValue="Send ➤"
              />
              <input
                className="shadow bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="reset"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
