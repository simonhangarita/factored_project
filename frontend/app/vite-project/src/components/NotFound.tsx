function NotFound(){
	return (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  }}>
    <img
      src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?t=st=1732748521~exp=1732752121~hmac=b03d24db7bd1e0cd44f5e520c6460116b0838a48a0979a81b65cf054257078c3&w=740"
      alt="new"
    />
    <h1>Page Not Found!!</h1>
    <h2 style={{ color: "gray"  }}>
      The page you are looking for doesn't exist or is temporarily unavailable
    </h2>
  </div>
);
}
export default NotFound;