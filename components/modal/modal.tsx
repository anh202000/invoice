import { FC, Fragment, memo, useState } from "react";

interface IProps {
  isShow?: boolean;
  onClose?: any;
  data?: any;
  title?: any;
  content?: any;
  onSubmit?: any;
}

const ModalBase: FC<IProps> = ({
  isShow,
  onClose,
  data,
  title,
  onSubmit,
}) => {
  const [selected, setSelected] = useState<any>();

  return (
    <Fragment>
      {isShow && (
        <div className="modal-custom" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {title}
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {/* content image */}
            <div className="modal-body modal_body">
              <div className="row">
                {data?.listBanner?.map((item: any) => (
                  <div
                    className="col-lg-2 col-md-12 mb-4 mb-lg-0"
                    onClick={() => setSelected(item)}
                  >
                    <img
                      className={`${selected?.id === item?.id ? 'border-selected-image mb-4 border border-primary' : 'shadow-1-strong rounded mb-4 img-thumbnail'}`}
                      src={item.url}
                      alt={item.url}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => onSubmit(selected?.url)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default memo(ModalBase);
