"use client";

import { useState } from "react";
import Link from "next/link";
import type { ServiceTree as T } from "@/types/domain";

function Caret({ open }: { open: boolean }) {
  return <span className="inline-block w-4">{open ? "▾" : "▸"}</span>;
}

export default function ServiceTree({ data }: { data: T[] }) {
  const [openServices, setOpenServices] = useState<Set<string>>(new Set());
  const [openClients, setOpenClients] = useState<Set<string>>(new Set());

  const toggleService = (id: string) => {
    const s = new Set(openServices);
    s.has(id) ? s.delete(id) : s.add(id);
    setOpenServices(s);
  };
  const toggleClient = (id: string) => {
    const s = new Set(openClients);
    s.has(id) ? s.delete(id) : s.add(id);
    setOpenClients(s);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 border">
      <h2 className="text-lg font-semibold mb-3">Services</h2>
      <ul className="space-y-1">
        {data.map(tree => {
          const svcOpen = openServices.has(tree.service.id);
          return (
            <li key={tree.service.id}>
              <button
                onClick={() => toggleService(tree.service.id)}
                className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded flex items-center"
              >
                <Caret open={svcOpen} />
                <span className="font-medium">{tree.service.name}</span>
                <span className="ml-2 text-xs text-gray-500">({tree.clients.length} clients)</span>
              </button>

              {svcOpen && (
                <ul className="mt-1 ml-5 border-l pl-3 space-y-1">
                  {tree.clients.map(node => {
                    const cid = `${tree.service.id}::${node.client.id}`; // identifie un client sous un service
                    const cliOpen = openClients.has(cid);
                    return (
                      <li key={cid}>
                        <button
                          onClick={() => toggleClient(cid)}
                          className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded flex items-center"
                        >
                          <Caret open={cliOpen} />
                          <span>{node.client.name}</span>
                          <span className="ml-2 text-xs text-gray-500">({node.points.length} points)</span>
                        </button>

                        {cliOpen && (
                          <ul className="mt-1 ml-5 border-l pl-3 space-y-1">
                            {node.points.map(pt => (
                              <li key={pt.id} className="flex items-center justify-between">
                                <Link href={`/points/${pt.id}`} className="px-2 py-1 rounded hover:bg-gray-50">
                                  <span className="font-medium">{pt.name}</span>{" "}
                                  <span className="text-xs text-gray-500">[{pt.code}]</span>
                                  <div className="text-xs text-gray-500">{pt.address}</div>
                                </Link>
                                <Link
                                  href={`/points/${pt.id}`}
                                  className="text-xs px-2 py-1 rounded border hover:bg-gray-50"
                                >
                                  Détail →
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
