const PageCardWrapper = ({ pageTitle, children, ...props }) => {
  return (
    <div {...props}>
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title mb-0"> {pageTitle}</h2>
          </div>
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageCardWrapper;
