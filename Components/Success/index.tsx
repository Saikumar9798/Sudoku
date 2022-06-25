import { FC, useCallback } from "react";

interface propTypes {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Success: FC<propTypes> = ({ setSuccess }) => {
  const handleNew = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  const handleClose = useCallback(() => {
    setSuccess(false);
  }, [setSuccess]);
  return (
    <div className="success-wrapper">
      <div className="success">
        <div className="title">Congratulations!</div>
        <div className="buttons">
          <button className="button pop" onClick={handleNew}>
            New One!
          </button>
          <button className="button close pop" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
