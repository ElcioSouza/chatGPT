import React from "react";
import graphqlRequestClient from "@/lib/graphql.request";
import moment from "moment";
import { useGetCreditAnalysisByCustomerQuery } from "../../../generated/graphql";

export default function CreditRequests() {
  const { data } = useGetCreditAnalysisByCustomerQuery(graphqlRequestClient);

  return (
    <>
      <div className="flex flex-row gap-2 mb-10 font-semibold text-2xl text-primary items-center">
        <h1>Minhas solicitações de crédito</h1>
      </div>
      <div className="flex flex-col gap-5 mb-10">
        {data?.getCreditAnalysisByCustomer?.map((item, index) => {
          const status =
            item && item.status
              ? {
                  in_progress: "Em análise",
                  completed: "Concluída",
                }[item.status]
              : undefined;
          return (
            <div
              key={index}
              className="text-gray-300 bg-white px-10 py-5 rounded-[16px]"
            >
              <div className="flex flex-row gap-5 justify-between">
                <div className="flex flex-col gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="font-medium">Número do pedido</span>
                  <span className="text-gray-500 font-semibold">{index}</span>
                </div>
                <div className="flex flex-col gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="font-medium">Status da solicitação</span>
                  <span className="text-gray-500 font-semibold">{status}</span>
                </div>
                <div className="hidden sm:flex flex-col gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="font-medium">Data da solicitação</span>
                  <span className="text-gray-500 font-semibold">
                    {moment(item?.createdAt).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div className="hidden sm:flex flex-col gap-1 max-w-[115px] whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="font-medium">Observações</span>
                  <span className="text-gray-500 font-semibold">Não há</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
