export function InputDefault({ text, method, value, type, name }) {
    return (
        <div className="w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {text}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={method}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
    );
}