import Completed from "../../../assets/images/Completed.svg";
import Incomplete from "../../../assets/images/Incomplete.svg";
import Locked from "../../../assets/images/Locked.svg";
import Styled from "react-emotion";

module.exports = Styled.div`
  &.details-page {
    .title-bar {
      display: flex;
      h3 {
        flex: 1;
        font-weight: 300;
        margin: 0;
        padding: 0;
      }

      a {
        text-align: right;
        text-decoration: none;
        font-size: 12px;
        color: blue;
      }
    }

    .task {
      margin-top: 24px;
      padding-left: 30px;
      background: url(${Incomplete}) no-repeat;
      height: 22px;
      line-height: 25px;
      cursor: pointer;

      &.completed {
        background: url(${Completed}) no-repeat;
      }

      &.locked {
        padding-left: 27px;
        margin-left: 3px;
        background: url(${Locked}) no-repeat;
      }
    }
  }
`;
