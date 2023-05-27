import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

function Header({ restartGame }) {
  const info = JSON.parse(localStorage.getItem("info"));
  const [open, setOpen] = useState(info);
  const [statistic, setStatistic] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const closeStatistic = () => setStatistic(false);

  if (JSON.parse(localStorage.getItem("timesGame"))) {
    var timesGame = JSON.parse(localStorage.getItem("timesGame"));
  } else {
    timesGame = [
      {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
      },
    ];
  }

  if (JSON.parse(localStorage.getItem("totalGames"))) {
    var totalGames = JSON.parse(localStorage.getItem("totalGames"));
  } else {
    totalGames = 0;
  }

  if (JSON.parse(localStorage.getItem("winGames"))) {
    var winGames = JSON.parse(localStorage.getItem("winGames"));
  } else {
    winGames = 0;
  }

  if (JSON.parse(localStorage.getItem("rateGames"))) {
    var rateGames = JSON.parse(localStorage.getItem("rateGames"));
  } else {
    rateGames = 0;
  }

  if (JSON.parse(localStorage.getItem("streakGames"))) {
    var streakGames = JSON.parse(localStorage.getItem("streakGames"));
  } else {
    streakGames = 0;
  }

  const clearStats = () => {
    localStorage.removeItem("totalGames");
    localStorage.removeItem("winGames");
    localStorage.removeItem("rateGames");
    localStorage.removeItem("streakGames");
    localStorage.removeItem("timesGame");

    closeStatistic();
    setTimeout(() => {
      setStatistic(true);
    }, 50);
  };

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  useEffect(() => {
    const toggleSwitch = document.querySelector('.Mode input[type="checkbox"]');

    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);

      if (currentTheme === "dark") {
        toggleSwitch.checked = true;
      }
    }
  }, []);

  return (
    <>
      <div className="Header">
        <span id="Version">V. 1.1.3</span>
        <Popup
          className="RestartMenuContainer"
          trigger={<span id="HeaderTitle">WordleTH</span>}
          closeOnDocumentClick
          position={"bottom left"}
        >
          <div className="RestartMenu" onClick={restartGame}>
            ต้องการเริ่มใหม่ ?
          </div>
          <div className="HeaderText">
            เกม WordleTH ที่เหมือนเกม Wordle แต่พัฒนาสำหรับเป็นภาษาไทย by
            Creaml4tt3
          </div>
          <div className="HeaderText">
            <p className="Date">12/08/2022</p>
            <span className="VersionChangelog">
              ===== V. 1.1.3 Changelog =====
            </span>
            <div className="Changelog">
              <span>={">"}</span> Add feature when submitted word alphabet that
              contains more than 1 letter will have number on the top right to
              show how many letters haved.
            </div>
          </div>
          <div className="HeaderText">
            <p className="Date">04/08/2022</p>
            <span className="VersionChangelog">
              ===== V. 1.1.2 Changelog =====
            </span>
            <div className="Changelog">
              <span>={">"}</span> Add feature when typing alphabet that not in
              the word will have background color of blue.
            </div>
            <div className="Changelog">
              <span>={">"}</span> Fixed bug when delete cause alphabet that is
              already activated to be deleted.
            </div>
          </div>
          <div className="HeaderText">
            <p className="Date">02/08/2022</p>
            <span className="VersionChangelog">
              ===== V. 1.1.1 Changelog =====
            </span>
            <div className="Changelog">
              <span>={">"}</span> Adjust resolution for mobile.
            </div>
          </div>
          <div className="HeaderText">
            <p className="Date">02/08/2022</p>
            <span className="VersionChangelog">
              ===== V. 1.1.0 Changelog =====
            </span>
            <div className="Changelog">
              {" "}
              <span>={">"}</span> Add dark mode switch.
            </div>
            <div className="Changelog">
              {" "}
              <span>={">"}</span> Fixed bugs.
            </div>
          </div>
          <div className="HeaderText">
            <p className="Date">31/07/2022</p>
            <span className="VersionChangelog">
              ===== V. 1.0.0 Changelog =====
            </span>
            <div className="Changelog">
              {" "}
              <span>={">"}</span> Lunch game.
            </div>
          </div>
        </Popup>
        <div className="IconContainer">
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className="Info"
            onClick={() => setOpen((o) => !o)}
          />
          <FontAwesomeIcon
            icon={faChartSimple}
            className="Statistic"
            onClick={() => setStatistic((o) => !o)}
          />
          <div className="ModeContainer">
            <label className="Mode" htmlFor="Switch" onChange={switchTheme}>
              <input type="checkbox" id="Switch" onChange={switchTheme} />
              <div className="Slider"></div>
            </label>
          </div>
        </div>

        <Popup
          className="InfoPopup"
          modal
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
        >
          <div className="InfoPopupContainer">
            <div className="InfoHeader">วิธีการเล่น</div>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="InfoClose"
              onClick={closeModal}
            />
            <div className="InfoContent">
              การเล่นทายคำศัพท์ปริศนา
              โดยการทายแต่ละครั้งจะได้ผลลัพธ์ที่แสดงออกมาในลักษณะสีต่างๆ
            </div>
            <div className="InfoContent">
              <span className="InfoTitle">ตัวอย่าง และ คำอธิบายของสิต่างๆ</span>
              <div className="RowInfo">
                <div className="InfoBoxes">บั</div>
                <div className="InfoBoxes Match Activated">ว</div>
                <div className="InfoBoxes">ล</div>
                <div className="InfoBoxes">อ</div>
                <div className="InfoBoxes">ย</div>
              </div>
              <p className="MatchInfo">
                สีเขียว : มีตัวอักษร ( อ ) อยู่ในคำและอยู่ในตำแหน่งที่ถูกต้อง
              </p>
              <div className="RowInfo">
                <div className="InfoBoxes">อ</div>
                <div className="InfoBoxes">า</div>
                <div className="InfoBoxes In Activated">ห</div>
                <div className="InfoBoxes">า</div>
                <div className="InfoBoxes">ร</div>
              </div>
              <p className="InInfo">
                สีเหลือง : มีตัวอักษร ( ห ) อยู่ในคำแต่อยู่ในตำแหน่งที่ผิด
              </p>
              <div className="RowInfo">
                <div className="InfoBoxes">เ</div>
                <div className="InfoBoxes">พ</div>
                <div className="InfoBoxes">ร</div>
                <div className="InfoBoxes NotIn Activated">า</div>
                <div className="InfoBoxes">ะ</div>
              </div>
              <p className="NotInInfo">สีเทาเข้ม : ไม่มีตัวอักษรในคำ</p>
            </div>
            <div className="InfoContent">
              <span className="InfoTitle">กฏพิเศษ และ คำอธิบายเพิ่มเติม</span>
              <div className="RowInfo">
                <div className="InfoBoxes">ก</div>
                <div className="InfoBoxes">า</div>
                <div className="InfoBoxes Match Activated">ร์</div>
                <div className="InfoBoxes In Activated">ตู</div>
                <div className="InfoBoxes">น</div>
              </div>
              เนื่องจากภาษาไทยมีสระและวรรณยุกต์ทำให้ยากต่อการเล่น
              จึงมีการเติมสระ และ วรรณยุกต์ให้อัตโนมัติ
              หากมีตัวอักษรที่อยู่ในคำปริศนามีผลทั้ง
              <span className="MatchInfo"> สีเขียว </span> และ
              <span className="InInfo"> สีเหลือง </span> ตัวอักษร{" "}
              <span className="MatchInfo">( ร )</span> เติม ( ์ ) และ{" "}
              <span className="InInfo">( ต ) </span>เติม ( ู )
              แต่หากว่ามีตัวอักษรนั้นมากกว่า 1
              ตัวในคำปริศนาจะนำสระและวรรณยุกต์ของตัวแรกสุดที่จะเจอมาเติมให้
              <div className="RowInfo">
                <div className="InfoBoxes">บ</div>
                <div className="InfoBoxes In Activated">ร</div>
                <div className="InfoBoxes In Activated">ร</div>
                <div className="InfoBoxes">จ</div>
                <div className="InfoBoxes">ง</div>
              </div>
              <div className="RowInfo">
                <div className="InfoBoxes">บ</div>
                <div className="InfoBoxes Match Activated">ร</div>
                <div className="InfoBoxes In Activated">ร</div>
                <div className="InfoBoxes">จ</div>
                <div className="InfoBoxes">ง</div>
              </div>
              หากพบว่าตัวอักษรเดียวกันมี
              <span className="InInfo">สีเหลืองสองตำแหน่งพร้อมกัน</span>
              มีความเป็นไปได้ว่าจะมีตัวอักษรนั้น " ร "
              หนึ่งตัวหรือมากกว่านั้นก็ได้ ซึ่งหากมี " ร "ที่เป็น
              <span className="MatchInfo">สีเขียวแล้ว</span>
              ก็มีความเป็นไปได้ว่าอาจจะมีอีกตัวหรือไม่มี
              <div className="RowInfo">
                <div className="InfoBoxes SelectedNotIn">บ</div>
                <div className="InfoBoxes Selected">ร</div>
                <div className="InfoBoxes Selected">ร</div>
                <div className="InfoBoxes SelectedNotIn">จ</div>
                <div className="InfoBoxes SelectedNotIn">ง</div>
              </div>
              หากเวลาพิมพ์
              ตัวอักษรในช่องไหนที่มีพื้นหลังสีฟ้าหมายถึงตัวอักษรนั้นเคยใช้แล้วและไม่มีอยู๋ในคำปริศนา
              เป็นตัวช่วยในการเล่นให่ง่ายขึ้น
              <div className="RowInfo">
                <div className="InfoBoxes">อ</div>
                <div className="InfoBoxes">า</div>
                <div className="InfoBoxes">ห</div>
                <div className="InfoBoxes">า</div>
                <div className="InfoBoxes In Activated">
                  ร<span>2</span>
                </div>
              </div>
              หากมีตัวเลขขึ้นมุมขวาบนของตัวอักษรนั้น
              หมายความว่าตัวอักษรนั้นมีจำนวนในคำปริษณาตามตัวเลขที่ปรากฏ
              ไม่นับสระและวรรณยุกต์
            </div>
          </div>
        </Popup>

        <Popup
          className="StatisticPopup"
          modal
          open={statistic}
          closeOnDocumentClick
          onClose={closeStatistic}
        >
          <div className="StatisticContainer">
            <div className="StatisticHeader">
              ข้อมูลการเล่นเกม
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="StatsClose"
                onClick={closeStatistic}
              />
            </div>
            <div className="StatsBox">
              <div className="StatsBoxes" id="TotalGames">
                เกมรวมทั้งหมด <span className="Number"> {totalGames}</span>
                ครั้ง
              </div>
              <div className="StatsBoxes" id="WinGames">
                เกมที่ชนะทั้งหมด <span className="Number"> {winGames}</span>
                ครั้ง
              </div>
              <div className="StatsBoxes" id="RateGames">
                อัตราการชนะ <span className="Number"> {rateGames}</span> %
              </div>
              <div className="StatsBoxes" id="StreakGames">
                ชนะติดต่อกัน <span className="Number"> {streakGames}</span>
                ครั้ง
              </div>
            </div>
            <div id="TimesContainer">
              <div id="TimesTextContainer">
                <div className="TimesText">1 :</div>
                <div className="TimesText">2 :</div>
                <div className="TimesText">3 :</div>
                <div className="TimesText">4 :</div>
                <div className="TimesText">5 :</div>
                <div className="TimesText">6 :</div>
              </div>
              <div id="TimesBarContainer">
                <div className="TimesBarBG">
                  <div
                    className="TimesBar"
                    style={{ width: 28 + timesGame[0].one * 20 }}
                  >
                    {timesGame[0].one}
                  </div>
                </div>
                <div className="TimesBarBG">
                  <div
                    className="TimesBar"
                    style={{ width: 28 + timesGame[0].two * 20 }}
                  >
                    {timesGame[0].two}
                  </div>
                </div>
                <div className="TimesBarBG">
                  <div
                    className="TimesBar"
                    style={{ width: 28 + timesGame[0].three * 20 }}
                  >
                    {timesGame[0].three}
                  </div>
                </div>
                <div className="TimesBarBG">
                  <div
                    className="TimesBar"
                    style={{ width: 28 + timesGame[0].four * 20 }}
                  >
                    {timesGame[0].four}
                  </div>
                </div>
                <div className="TimesBarBG">
                  <div
                    className="TimesBar"
                    style={{ width: 28 + timesGame[0].five * 20 }}
                  >
                    {timesGame[0].five}
                  </div>
                </div>
                <div className="TimesBarBG">
                  <div
                    className="TimesBar"
                    style={{ width: 28 + timesGame[0].six * 20 }}
                  >
                    {timesGame[0].six}
                  </div>
                </div>
              </div>
            </div>
            <button className="Restart" id="ClearStats" onClick={clearStats}>
              ต้องการล้างข้อมูลหรือไหม ?
            </button>
          </div>
        </Popup>
      </div>
    </>
  );
}

export default Header;
