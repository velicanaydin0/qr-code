

export default function ImageUploader({handleFileSelect}) {
  return (
    <div >
      <input type="file" onChange={handleFileSelect} />
    </div>
  );
}