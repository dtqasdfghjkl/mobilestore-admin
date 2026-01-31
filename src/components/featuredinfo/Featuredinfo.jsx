import React from "react";
import "./featuredinfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function Featuredinfo(props) {
  console.log(props.sales.sales +" sale "+props.preSales.sales)
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Order</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.trans[1]}</span>
          <span className="featuredMoneyRate">
            {props.trans[1] - props.trans[0]}
            <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ${props.sales.sales.toString().replace(/\d(?=(\d{3})+\.*)/g, "$&,")}
          </span>

          {props.sales.sales - props.preSales.sales < 0 ? (
            <span className="featuredMoneyRate">
              {(props.sales.sales - props.preSales.sales)
                .toString()
                .replace(/\d(?=(\d{3})+\.*)/g, "$&,")}
              <ArrowDownward className="featuredIcon negative" />
            </span>
          ) : (
            <span className="featuredMoneyRate">
              +
              {
                (props.sales.sales - props.preSales.sales)
                  .toString()
                  .replace(/\d(?=(\d{3})+\.*)/g, "$&,") /* .toFixed(1) */
              }
              <ArrowUpward className="featuredIcon" />
            </span>
          )}
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Product</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.product[1]}</span>
          <span className="featuredMoneyRate">
            {props.product[1] - props.product[0] < 0 ? (
              <>
              {props.product[1] - props.product[0]}
              <ArrowDownward className="featuredIcon negative" />
              </>
            ) : (
              <>+ {props.product[1] - props.product[0]}
              <ArrowUpward className="featuredIcon" />
              </>
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
