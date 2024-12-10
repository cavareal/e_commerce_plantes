
import Header from "../components/organism/Header";
import brandName from "../assets/logo/Logo-removebg.png";

function Error() {
    return (
        <div>
            <Header className="w-full"/>
            <div className={"my-6"}>
                <img src={brandName} alt="brandName" className="mx-auto w-96 h-auto"/>
                <h1 className="text-center text-4xl">La page que vous cherchez n'existe pas</h1>
            </div>
        </div>
    )
}

export default Error;