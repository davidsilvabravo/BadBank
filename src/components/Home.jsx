const Home = () => {
  const customStyles = {
    width: "40rem",
    padding: "20px",
    zIndex: "-1",
    opacity: 0.85
  };

  return (
    <>
      <div className="card-container">
        <div className="card" style={customStyles}>
          <h5 className="card-title">InterBank</h5>
          <img src="/images/family.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h4 className="card-text" id="family">Welcome to InterBank</h4>
            <p className="card-text">
              For all your banking needs!
            </p>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Home;
