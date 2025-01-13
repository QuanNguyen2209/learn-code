import React, { useEffect, useState } from "react";

type Props = {};

type NavbarProps = {
  duLieu: number;
};

function Navbar({ duLieu }: NavbarProps) {
  useEffect(() => {
    console.log("Navbar component did mount");
  }, []);
  useEffect(() => {
    return () => {
      console.log("Navbar component will unmount");
    };
  }, []);
  useEffect(() => {});
  return (
    <nav>
      <h1>Navbar {duLieu}</h1>
    </nav>
  );
}

function EmployeeList() {
  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeDepartment, setEmployeeDepartment] = useState<string>("");
  const [employeeGender, setEmployeeGender] = useState<"nam" | "nu" | "khac">(
    "nam"
  );

  const [employeeList, setEmployeeList] = useState<
    {
      createAt: string;
      name: string;
      avatar: string;
      department: string;
      gender: string;
      id: number;
    }[]
  >([]);

  useEffect(() => {
    async function fetchEmployeeList() {
      const response = await fetch(
        "https://676d60880e299dd2ddff5d85.mockapi.io/employee"
      );
      const data = await response.json();
      setEmployeeList(data);
    }
    fetchEmployeeList();
  }, []);

  async function handleCreateEmployee() {
    const employeeData = {
      name: employeeName,
      department: employeeDepartment,
      gender: employeeGender,
    };

    await fetch("https://676d60880e299dd2ddff5d85.mockapi.io/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    }).then(async (result) => {
      const newItemData = await result.json();
      setEmployeeList([...employeeList, newItemData]);
      alert("Tạo nhân viên thành công");
    });
  }

  const handleDeleteEmployee = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      await fetch(
        `https://676d60880e299dd2ddff5d85.mockapi.io/employee/${id}`,
        {
          method: "DELETE",
        }
      ).then(async (result) => {
        alert("Xóa nhân viên thành công");
        const removedItemData = await result.json();
        setEmployeeList((prevList) =>
          prevList.filter((employee) => removedItemData.id !== employee.id)
        );
      });
    }
  };
  return (
    <div className="flex flex-col gap-5 divide-y-[1px]">
      <div className="flex gap-3 py-3">
        <input
          className="bg-black border-[1px] border-white rounded-md p-1"
          placeholder="name..."
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <input
          className="bg-black border-[1px] border-white rounded-md p-1"
          placeholder="department..."
          value={employeeDepartment}
          onChange={(e) => setEmployeeDepartment(e.target.value)}
        />
        <select
          className="bg-black border-[1px] border-white rounded-md p-1"
          value={employeeGender}
          onChange={(e) =>
            setEmployeeGender(e.target.value as "nam" | "nu" | "khac")
          }
        >
          <option value="nam">Nam</option>
          <option value="nu">Nu</option>
          <option value="khac">Khac</option>
        </select>
        <button onClick={() => handleCreateEmployee()}>Tạo nhân viên</button>
      </div>
      {employeeList.map((data) => (
        <div className="py-2 flex flex-col gap-2" key={data.id}>
          <h2 className="text-2xl text-green-400">{data.name}</h2>
          <p>
            department:{" "}
            <span className="text-fuchsia-500">{data.department}</span>
          </p>
          <p>{data.gender}</p>
          <div className="flex gap-3">
            <button className="border p-1 px-2 rounded">update name</button>
            <button className="border p-1 px-2 rounded">
              update department
            </button>
            <button className="border p-1 px-2 rounded">update gender</button>
            <button
              className="border p-1 px-2 rounded bg-red-500"
              onClick={() => handleDeleteEmployee(data.id)}
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

type EmployeeType = {
  name: string;
  age: number;
  company?: string;
  position: string;
  gender: string;
};

export default function Index({}: Props) {
  const [isShowNavbar, setIsShowNavbar] = useState<boolean>(true);
  const [navBarData, setNavBarData] = useState<number>(0);
  const [employeeData, setEmployeeData] = useState<EmployeeType>({
    name: "Nguyen Van A",
    age: 20,
    company: "FPT",
    position: "Dev",
    gender: "Nam",
  });

  useEffect(() => {
    console.log("isShowNavbar state has changed");
  }, [isShowNavbar]);

  const handleEmployeeData = () => {
    setEmployeeData({
      ...employeeData,
      name: "Nguyen Van B",
    });
  };

  const handleRemoveEmployeeProperty = () => {
    const { company, ...rest } = employeeData;
    console.log(rest);
    setEmployeeData(rest);
  };
  return (
    <div>
      <EmployeeList />

      {isShowNavbar && <Navbar duLieu={navBarData} />}
      <button onClick={() => setIsShowNavbar(!isShowNavbar)}>Click me</button>
      <h1 className="font-mono text-2xl text-red-400">{employeeData.name}</h1>
      <h2 className="font-mono text-xl text-green-500">{employeeData.age}</h2>
      <h2 className="font-mono text-xl text-green-500">
        {employeeData.gender}
      </h2>
      <h2 className="font-mono text-xl text-green-500">
        {employeeData.position}
      </h2>
      <h2 className="font-mono text-xl text-green-500">
        {employeeData.company}
      </h2>
      <div className="flex flex-col items-start">
        <button onClick={() => handleEmployeeData()}>
          change employee data
        </button>
        <button onClick={() => handleRemoveEmployeeProperty()}>
          remove company property
        </button>
        <button onClick={() => setNavBarData(navBarData + 1)}>
          Cấp dữ liệu cho navbar
        </button>
      </div>
    </div>
  );
}
