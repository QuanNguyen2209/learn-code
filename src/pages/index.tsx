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
  useEffect(() => {
    console.log("Navbar component did update");
  });
  return (
    <nav>
      <h1>Navbar {duLieu}</h1>
    </nav>
  );
}

export default function Index({}: Props) {
  const [isShowNavbar, setIsShowNavbar] = useState<boolean>(true);
  const [navBarData, setNavBarData] = useState<number>(0);
  useEffect(() => {
    console.log("isShowNavbar state has changed");
  }, [isShowNavbar]);

  return (
    <div>
      {isShowNavbar && <Navbar duLieu={navBarData} />}
      <button onClick={() => setIsShowNavbar(!isShowNavbar)}>Click me</button>
      <button onClick={() => setNavBarData(navBarData + 1)}>
        Cấp dữ liệu cho navbar
      </button>
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
