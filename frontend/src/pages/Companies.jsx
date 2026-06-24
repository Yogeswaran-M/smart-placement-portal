import { useEffect, useState } from "react";
import axios from "axios";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const filteredCompanies = companies.filter((company) =>
    company.companyName
        .toLowerCase()
        .includes(search.toLowerCase())
);

    const getAllCompanies = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "https://smart-placement-portal-po8m.onrender.com/api/company/all"
            );

            setCompanies(res.data.companies);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleApply = async (companyId) => {
        const student = JSON.parse(localStorage.getItem("student"));
        if (
            !student.name ||
            !student.college ||
            !student.degree ||
            !student.cgpa ||
            !student.skills ||
            !student.resume
        ) {
            alert("Complete your profile and upload your resume before applying");
            return;
        }
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "https://smart-placement-portal-po8m.onrender.com/api/application/apply",
                {
                    companyId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);
        } catch (error) {
            if (error.response?.status === 400) {
                alert(error.response?.data.message);
                return;
            }

            alert("Something went wrong");
        }
    };

    useEffect(() => {
        getAllCompanies();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center gap-2 font-semibold text-xl md:text-3xl">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <h1>Loading Companies...</h1>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 md:p-10 lg:p-20 mt-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
                All Companies
            </h1>
            <input
             type="text"
             placeholder="Search Company..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="border p-2 rounded-lg w-full md:w-80 mb-4"
             />
             {
                filteredCompanies.length === 0 ? (
                    <h2 className="text-center text-red-500 text-xl mt-10">Company Not Found</h2>
                ) : (
                    filteredCompanies.map((company) => {
                        //company card
                    })
                )
             }

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                    <div
                        key={company._id}
                        className="bg-white shadow-lg rounded-2xl p-5 border hover:shadow-2xl transition duration-300 w-full flex flex-col h-[430px]"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 break-words">
                            {company.companyName.toUpperCase()}
                        </h2>

                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Role :</span>{" "}
                            {company.role}
                        </p>

                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Package :</span>{" "}
                            {company.package}
                        </p>

                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Location :</span>{" "}
                            {company.location}
                        </p>

                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Eligibility :</span>{" "}
                            {company.eligibility}
                        </p>

                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">CGPA :</span>{" "}
                            {company.cgpa}
                        </p>

                        <p className="text-gray-700 mb-4 break-words">
                            <span className="font-semibold">Description :</span>{" "}
                            {company.description}
                        </p>
                        <div className="mt-auto pt-4">
                            <button
                                onClick={() => handleApply(company._id)}
                                className="w-full bg-green-600 font-semibold text-white px-4 py-3 rounded-lg hover:bg-green-700 transition"
                            >
                                Apply
                            </button>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );

};

export default Companies;