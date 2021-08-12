import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { getPublishDate } from "../../../../assets/addFuncs";
import s from "../Info.module.css";

const RightBlock = (props) => {
  const [addToFavId, setAddToFavId] = useState([]);

  let id = props.match.path.match(/\d+/gi) || [""];
  id = +id[0] ? id[0] + "/" : "";

  const addToFavs = (id) => {
    if (!addToFavId.includes(id)) {
      setAddToFavId([...addToFavId, id]);
    } else {
      setAddToFavId([...addToFavId.filter((i) => i !== id)]);
    }
  };

  const photos = props.photos.map((photo) => {
    return (
      <div key={photo.id} className={s.right_photo}>
        {photo.img && (
          <img className={s.right_img} src={photo.img} alt={`Img${photo.id}`} />
        )}
      </div>
    );
  });

  const posts = props.rightPosts.map((post) => {
    return (
      <div key={post.id} className={s.right_post}>
        <div className={s.container}>
          <h4 className={s.right_title}>{post.title}</h4>
          <p className={s.right_text}>{post.excerpt}</p>
          <p className={s.right_date}>{getPublishDate(post.date)} ago</p>
        </div>
      </div>
    );
  });

  const pages = props.favPages.map((page) => {
    const idCheck = addToFavId.includes(page.id);

    return (
      <div className={s.fav_item} key={page.id}>
        <div className={s.container + " " + s.fav_page}>
          <div className={s.fav_left}>
            <img src={page.img} className={s.fav_img} alt={page.name} />
            <div className={s.fav_info}>
              <h4 className={s.fav_name}>{page.name}</h4>
              <p className={s.fav_type}>{page.type}</p>
            </div>
          </div>
          <div
            className={s.fav_right}
            onClick={() => {
              addToFavs(page.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={s.fav_svg + " " + (idCheck && s.fav_svg_active)}
            >
              <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
            </svg>
            <span className={s.fav_alt}>
              {idCheck ? "Remove from ur favs" : "Add to your favs"}
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={s.right_bar}>
      <NavLink to={`/page/${id}photos`}>
        <div className={s.info_block + " " + s.right_block}>
          <div className={s.main_right_title}>
            <div className={s.container}>
              <h3 className={s.title_row}>
                Last Photos <span className={s.dots}>•••</span>
              </h3>
            </div>
          </div>
          <div className={s.container + " " + s.right_photos}>{photos}</div>
        </div>
      </NavLink>
      <NavLink to={`/page/${id}posts`}>
        <div className={s.info_block + " " + s.right_block}>
          <div className={s.main_right_title}>
            <div className={s.container}>
              <h3 className={s.title_row}>
                Blog Posts <span className={s.dots}>•••</span>
              </h3>
            </div>
          </div>
          <div className={s.right_posts}>{posts}</div>
        </div>
      </NavLink>

      <div className={s.info_block + " " + s.right_block}>
        <div className={s.main_right_title}>
          <div className={s.container}>
            <h3 className={s.title_row}>
              Favorite Pages <span className={s.dots}>•••</span>
            </h3>
          </div>
        </div>
        <div className={s.fav_pages}>{pages}</div>
      </div>
    </div>
  );
};

export default withRouter(RightBlock);
