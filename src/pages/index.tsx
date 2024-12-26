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
// import React, { Component } from "react";
// type Props = {};

// type State = {
//   isShowNavbar: boolean;
//   isShowButton: boolean;
// };

// class Navbar extends Component {
//   componentDidMount(): void {
//     console.log("Navbar component did mount");
//   }

//   componentWillUnmount(): void {
//     console.log("Navbar component will unmount");
//   }
//   render() {
//     return (
//       <nav>
//         <h1>Navbar</h1>
//       </nav>
//     );
//   }
// }

// class Index extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       isShowNavbar: true,
//       isShowButton: true,
//     };
//   }

//   componentDidUpdate(
//     prevProps: Readonly<Props>,
//     prevState: Readonly<State>,
//     snapshot?: any
//   ): void {
//     if (this.state.isShowNavbar !== prevState.isShowNavbar) {
//       console.log("isShowNavbar state has changed");
//     }
//   }

//   count = () => {
//     this.setState((prevState) => ({
//       isShowNavbar: !prevState.isShowNavbar,
//       isShowButton: !prevState.isShowButton,
//     }));
//   };

//   render() {
//     return (
//       <div>
//         {this.state.isShowNavbar && <Navbar />}
//         <p>{this.state.isShowNavbar}</p>
//         <button onClick={this.count}>Click me</button>
//       </div>
//     );
//   }
// }

// export default Index;
