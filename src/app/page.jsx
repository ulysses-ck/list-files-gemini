import { fileManager } from "@/gemini";
import { deleteFile } from "./actions";

export const revalidate = 10;

export default async function Home() {
  const response = await fileManager.listFiles();

  console.log(response);

  return (
    <main className="flex flex-col">
      <h1>List Files of Gemini</h1>

      <div>
        <h2>Result</h2>
        <ul>
          <li>
            <div className="grid grid-cols-5 items-center justify-center">
              <span>File Name</span>
              <span>Size</span>
              <span>Create Time</span>

              <span>URI</span>
              <span>Action</span>
            </div>
          </li>

          {response.files
            ? response.files.map((file) => {
                return (
                  <li key={file.sha256Hash}>
                    <div className="grid grid-cols-5 items-center justify-center">
                      <span className="border border-b-black w-full break-words">
                        {file.name}
                      </span>
                      <span className="border border-b-black w-full break-words">
                        {file.sizeBytes}
                      </span>
                      <span className="border border-b-black w-full break-words">
                        {new Date(file.createTime).toLocaleString()}
                      </span>
                      <span className="border border-b-black w-full break-words">
                        {file.uri}
                      </span>
                      <span className="border border-b-black w-full break-words">
                        <form action={deleteFile}>
                          <input
                            type="hidden"
                            name="fileName"
                            value={file.name}
                          />
                          <button
                            className="bg-red-600 text-white p-2"
                            type="submit"
                          >
                            Delete File
                          </button>
                        </form>
                      </span>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </main>
  );
}
