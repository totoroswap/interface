import React from 'react'
import styled from 'styled-components'
import { FlexCenter, FlexCenterH } from '../../theme'
import Grass1Img from '../../assets/images/info/grass1.png'
import Grass2Img from '../../assets/images/info/grass2.png'
import Grass3Img from '../../assets/images/info/grass3.png'
import Grass4Img from '../../assets/images/info/grass4.png'
import Grass5Img from '../../assets/images/info/grass5.png'
import { ReactComponent as NextSvg } from '../../assets/images/info/next.svg'
import BGImg from '../../assets/images/info/info_bg.png'
import { useDarkModeManager } from '../../state/user/hooks'

const NextIcon = styled(NextSvg)`
  width: 24px;
  height: 24px;
`
const InfoPageBG = styled.div<{ isDark: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: url(${BGImg});
  background-size: cover;
  background-attachment: fixed;
  opacity: ${({ isDark }) => (isDark ? 0.1 : 1)};
`
const InfoPage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 80px;
  .info-page {
    width: 100%;
    max-width: 1000px;
    margin: auto;
    padding: 50px;
    box-sizing: border-box;

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 30px;
    `}
    .banner-box {
      position: relative;
      width: 100%;

      .banner {
        position: relative;
        z-index: 1;
        ${FlexCenter};
        width: 100%;
        min-height: 100px;
        background: #135658;
        border-radius: 20px;

        div {
          width: 80%;
          padding: 30px 0;
          color: ${({ theme }) => theme.white};
          font-size: 12px;
          line-height: 14px;
        }
      }

      .grass1 {
        position: absolute;
        left: -32px;
        bottom: 0;
        z-index: 0;
        width: 46px;
        height: 95px;
        user-select: none;
        user-drag: none;
      }

      .grass2 {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
        width: 160px;
        height: 56px;
        user-select: none;
        user-drag: none;
      }

      .grass3 {
        position: absolute;
        top: -45px;
        right: -20px;
        z-index: 1;
        width: 125px;
        height: 91px;
        user-select: none;
        user-drag: none;
      }
    }

    .info-main {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;

      ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        flex-direction: column;
      `}
      .dsg-info {
        position: relative;
        width: 100%;
        max-width: 540px;
        min-width: 315px;
        height: 360px;
        background: #e5f2e9;
        border-radius: 20px;
        margin-right: 40px;
        padding: 30px 27px 30px 30px;

        ${({ theme }) => theme.mediaWidth.upToExtraSmall`
          min-width: auto!important;
          padding: 20px!important;
          margin-right: 0;
          h2{
            font-size: 18px!important;
          }
          div{
            font-size: 14px!important;
          }
        `}
        h2 {
          font-size: 30px;
          margin: 0 0 20px 0;
          font-weight: 600;
          color: #135658;
          line-height: 45px;
        }

        .line {
          display: flex;
          color: #135658;
          margin: 4px 0;
          font-size: 20px;
          line-height: 30px;

          & > div:nth-child(1) {
            flex: 1;
            font-weight: 500;
          }

          & > div:nth-last-child(1) {
            font-weight: 600;
          }
        }

        .grass4 {
          position: absolute;
          left: -50px;
          bottom: -10px;
          z-index: 1;
          width: 142px;
          height: 103px;
          user-select: none;
          user-drag: none;
          ${({ theme }) => theme.mediaWidth.upToExtraSmall`
            width: 100px;
            height: 75px;
          `}
        }
      }

      .links {
        padding: 0 20px 20px 20px;
        position: relative;
        width: 100%;
        max-width: 320px;
        height: 360px;
        background: #e5f2e9;
        border-radius: 20px;

        .grass5 {
          position: absolute;
          right: -50px;
          bottom: -10px;
          z-index: 1;
          width: 142px;
          height: 103px;
          user-select: none;
          user-drag: none;
          ${({ theme }) => theme.mediaWidth.upToExtraSmall`
            width: 100px;
            height: 75px;
          `}
        }

        ${({ theme }) => theme.mediaWidth.upToExtraSmall`
          margin-top: 30px;
          padding: 0 10px 10px 10px!important;
          max-width: 100%;
          h2{
            font-size: 18px!important;
          }
          p{
            font-size: 14px!important;
          }
        `}
        h2 {
          font-size: 30px;
          font-weight: 500;
          margin: 0;
        }

        p {
          margin: 0;
        }

        & > div {
          width: 100%;
          height: 92px;
          background: #135658;
          border-radius: 20px;
          padding: 15px 20px;
          margin: 20px auto auto auto;
          color: ${({ theme }) => theme.white};
        }

        .defi {
          display: flex;
          background: #2d885c;
          cursor: pointer;

          & > div:nth-child(1) {
            flex: 1;
            ${FlexCenter};
            flex-direction: column;
            align-items: self-start;
          }

          & > div:nth-child(2) {
            ${FlexCenterH};
          }
        }

        .networks {
          ${FlexCenter};
          flex-direction: column;
          align-items: self-start;
          background: #125659;
        }

        .more {
          ${FlexCenter};
          flex-direction: column;
          align-items: self-start;
          background: #32be39;
        }
      }
    }
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding-top: 20px;
    `}
`
export default function Info() {
  const [isDark] = useDarkModeManager()
  return (
    <InfoPage>
      <InfoPageBG isDark={isDark} />
      <div className="info-page">
        <div className="banner-box">
          <div className="banner">
            <div>
              After Venus was hit by a meteorite, when you wake up, you find that you and your little partner have come
              to the prehistoric dinosaur era, which is full of unknowns, but the only certainty is that DSG is the
              'hard currency' of the crypto world
            </div>
          </div>
          <img src={Grass1Img} className="grass1" />
          <img src={Grass2Img} className="grass2" />
          <img src={Grass3Img} className="grass3" />
        </div>
        <div className="info-main">
          <div className="dsg-info">
            <h2>DSG Info</h2>
            <div className="line">
              <div>Price</div>
              <div>$1.075</div>
            </div>
            <div className="line">
              <div>Circulation</div>
              <div>16,636,050</div>
            </div>
            <div className="line">
              <div>Burned</div>
              <div>1,592,131</div>
            </div>
            <div className="line">
              <div>Market cap</div>
              <div>$18M</div>
            </div>
            <div className="line">
              <div>Total TVL</div>
              <div>$283,391,782</div>
            </div>
            <div className="line">
              <div>Volume 24H</div>
              <div>$67,035,627</div>
            </div>
            <img src={Grass4Img} className="grass4" />
          </div>
          <div className="links">
            <div className="defi">
              <div>
                <h2>Defi</h2>
                <p>Click to enter</p>
              </div>
              <div>
                <NextIcon />
              </div>
            </div>
            <div className="networks">
              <h2>Social Networks</h2>
              <p>Coming soon</p>
            </div>
            <div className="more">
              <h2>And More</h2>
              <p>Coming soon</p>
            </div>
            <img src={Grass5Img} className="grass5" />
          </div>
        </div>
      </div>
    </InfoPage>
  )
}
