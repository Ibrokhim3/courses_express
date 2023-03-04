import { useRef, useState } from "react";
export default function UploadFile() {
  let userN = useRef();

  const [img, setImg] = useState("");

  const uploadFile = async (e) => {
    e.preventDefault();

    let files = e.target.files;

    const formData = new FormData();

    formData.append("file", files[0]);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    setImg(res.img_name);
    console.log(res);
    // alert(JSON.stringify(`${res.img_name}`))
  };

  const sendData = (e) => {
    e.preventDefault();

    let { title, price } = e.target;

    alert(img);

    fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        price: price.value,
        img,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));

    title.value = "";
    price.value = "";
  };

  return (
    <div className="m-auto w-50">
      <h1 className={"text-center mt-4"}>Upload file</h1>
      <form onSubmit={(e) => sendData(e)}>
        <div className="form-group">
          <label htmlFor="email">Title:</label>
          <input
            required
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            required
            type="text"
            name="price"
            className="form-control"
            placeholder="Enter prive"
          />
        </div>
        <div className="form-group">
          <input type="file" onChange={(e) => uploadFile(e)} name="file" />
        </div>
        <button type="submit" className="btn btn-primary">
          upload file
        </button>
      </form>
    </div>
  );
}
