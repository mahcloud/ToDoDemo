import Img from "../../../assets/images/Group.svg";
import Styled from "react-emotion";

module.exports = Styled.div`
  &.groups-page {
    h3 {
      font-weight: 300;
      padding: 0;
      margin: 0;
    }

    .group {
      margin-top: 30px;
      padding-left: 30px;
      background: url(${Img}) no-repeat 0px 12px;
      cursor: pointer;

      .group-name {
        font-weight: 700;
      }

      .group-completed-total {
        color: #999999;
        font-size: 12px;
      }
    }
  }
`;
