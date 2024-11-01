import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [activeMenu, setActiveMenu] = useState({
    menu: 0,
    submenu: 0,
  });

  const handleMenuClick = (menuIndex, key) => {
    setActiveMenu((prev) => {
      return { ...prev, [key]: menuIndex };
    });
  };

  useEffect(() => {
    const menuData = async () => {
      try {
        const response = await axios.get(
          "https://qaapi.sundialhome.com/api/header/header"
        );

        if (response?.data) {
          setData(response.data.headerData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    menuData();
  }, []);

  return (
    <div className="main">
      <nav className="navbar">
        {data.length > 0 &&
          data.map((menu, index) => (
            <span
              key={index}
              onClick={() => handleMenuClick(index, "menu")}
              className={activeMenu.menu === index ? "active" : ""}
            >
              {menu.title}
            </span>
          ))}
      </nav>
      <div className="megaMenu">
        <div className="subMenu">
          {data[activeMenu.menu]?.submenu.map((submenu, index) => {
            return (
              <div
                className={`${
                  activeMenu.submenu === index ? "active" : ""
                } menuItem`}
                key={index}
                onClick={() => handleMenuClick(index, "submenu")}
              >
                <p>{submenu.title}</p>
                {activeMenu.submenu === index && (
                  <span className="menuOpener">
                    <IoIosArrowForward />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="variations">
          {data[activeMenu.menu]?.submenu[activeMenu.submenu]?.variations.map(
            (variation, index) => {
              return (
                <div className="menuItem" key={index}>
                  {variation?.image ? (
                    <img
                      className="variationImg"
                      src={variation.image}
                      alt="image"
                    />
                  ) : (
                    <span>
                      Img
                      <span>T{index + 1}</span>
                    </span>
                  )}
                  <p>{variation.title}</p>
                </div>
              );
            }
          )}
        </div>

        <div className="spotItems">
          {data[activeMenu.menu]?.submenu[activeMenu.submenu]?.spotItems.map(
            (spotItem, index) => {
              return (
                <div className="menuItem" key={index}>
                  {index > 0 &&
                  index <
                    data[activeMenu.menu]?.submenu[activeMenu.submenu]
                      ?.spotItems.length -
                      1 ? (
                    spotItem?.image ? (
                      <img
                        className="soptItemImg"
                        src={spotItem.image}
                        alt="image"
                      />
                    ) : (
                      <span>
                        Spotlight
                        <span>{index + 1}</span>
                        <span>Image</span>
                      </span>
                    )
                  ) : null}

                  {index ===
                  data[activeMenu.menu]?.submenu[activeMenu.submenu]?.spotItems
                    .length -
                    1 ? (
                    <a
                      className="spotLink"
                      href={spotItem.title}
                      alt="link"
                      target="_blank"
                    >
                      <div>
                        <p>Spotlight Link</p>
                        <p style={{ color: "#b5b5b59c" }}>{spotItem.body}</p>
                      </div>

                      <IoIosArrowRoundForward
                        fontSize={22}
                        cursor={"pointer"}
                      />
                    </a>
                  ) : (
                    <div>
                      <p>{spotItem.title}</p>
                      <p style={{ color: "#b5b5b59c" }}>{spotItem.body}</p>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
