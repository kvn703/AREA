interface ImgComponentProps {
  url: string;
}

const ImagePage: React.FC<ImgComponentProps> = (ImgComponentProps) => {
  return (
    <>
      <img
        src={ImgComponentProps.url}
        alt="Image"
        className="h-full w-full object-cover"
      />
    </>
  );
};

export default ImagePage;
