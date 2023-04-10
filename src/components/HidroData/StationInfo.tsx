import React from "react";
import "./hidrodata.css";
import { useTranslation } from "react-i18next";
import Table from "react-bootstrap/Table";
import Station from "../DataModels/Station4";

interface StationInfoProps{
  dataLoad: boolean;
  sInfo: Station | undefined;
}

const StationInfo = function (props: StationInfoProps) {

    const { t } = useTranslation();

    return (
        <div className="hidro-wrap">
        <div className="station-details">
          <Table responsive striped bordered hover size="sm">
            <tbody>
              <tr>
                <td style={{ width: "20%" }}>
                  <span>{t("name")}:</span>
                </td>
                <td colSpan={3}>{props.dataLoad && props.sInfo!.getName()}</td>
              </tr>
              <tr>
                <td>
                  <span>{t("scope")}:</span>
                </td>
                <td colSpan={3}>{props.dataLoad && props.sInfo!.getBasin()}</td>
              </tr>
               <tr>
                    <td colSpan={4}>
                      <span>{t("longitude_latitude")}: </span>{" "}
                      {props.dataLoad && props.sInfo!.getLongitude().toFixed(5)}/
                      {props.dataLoad && props.sInfo!.getLatitude().toFixed(5)}
                    </td>
                  </tr>
              <tr>
                <td>
                  <span>{t("code")}:</span>
                </td>
                <td>{props.dataLoad && props.sInfo!.getID()}</td>
                <td style={{ width: "20%" }}>
                  <span>{t("type")}:</span>
                </td>
                <td>
                  {props.dataLoad && props.sInfo!.getType() === "pluv"
                    ? t("pluviometric")
                    : t("fluviometric")}
                </td>
              </tr>
              <tr>
                <td>
                  <span>{t("city")}:</span>
                </td>
                <td>{props.dataLoad && props.sInfo!.getCity()}</td>
                <td>
                  <span>{t("country_state")}:</span>
                </td>
                <td>{props.dataLoad && props.sInfo!.getUF()}</td>
              </tr>
              <tr>
                <td>
                  <span>{t("operator")}:</span>
                </td>
                <td>{props.dataLoad && props.sInfo!.getOperator()}</td>
                <td>
                  <span>{t("responsible")}:</span>
                </td>
                <td>{props.dataLoad && props.sInfo!.getAccountable()}</td>
              </tr>
              <tr>
                <td>
                  <span>{t("escale")}:</span>
                </td>
                <td>
                  {props.dataLoad && props.sInfo!.getScale() ? t("yes") : t("no")}
                </td>
                <td>
                  <span>{t("climatological")}:</span>
                </td>
                <td>
                  {props.dataLoad && props.sInfo!.getClimatological()
                    ? t("yes")
                    : t("no")}
                </td>
              </tr>
              <tr>
                <td>
                  <span>{t("evaporimeter")}:</span>
                </td>
                <td>
                  {props.dataLoad && props.sInfo!.getEvaporimeter()
                    ? t("yes")
                    : t("no")}
                </td>
                <td>
                  <span>{t("telemetry")}:</span>
                </td>
                <td>
                  {props.dataLoad && props.sInfo!.getTelemetry()
                    ? t("yes")
                    : t("no")}
                </td>
              </tr>
              <tr>
                <td>
                  <span>{t("water_quality")}:</span>
                </td>
                <td>
                  {props.dataLoad && props.sInfo!.getWaterQuality()
                    ? t("yes")
                    : t("no")}
                </td>
                <td>
                  <span>{t("sediments")}:</span>
                </td>
                <td>
                  {props.dataLoad && props.sInfo!.getSediments()
                    ? t("yes")
                    : t("no")}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
}

export default StationInfo;