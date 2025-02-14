import PartnerCard from "./PartnerCard";

const Partner = () => {
  return (
    <div>
      <section className="m-4 md:m-8 dark:bg-gray-100 dark:text-gray-800">
	<div className="container mx-auto p-4 my-6 space-y-2 text-center">
		<h2 className="text-5xl font-bold">Become a happy partner with SamNexus</h2>
		<p className="dark:text-gray-600">Get your favourite one. All ares here.</p>
	</div>

	<div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4">

		<PartnerCard/>		
		<PartnerCard/>		
		<PartnerCard/>		
		<PartnerCard/>		
		<PartnerCard/>		

	</div>
</section>
    </div>
  );
};

export default Partner;