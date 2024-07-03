import FormWrapper from "@/components/updateProduct/FormWrapper";

const page = ({ params }: { params: { updateProduct: string } }) => {
  return (
    <div>
      <FormWrapper id={params.updateProduct} />
    </div>
  );
};

export default page;
