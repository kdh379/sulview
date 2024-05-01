import Link from "next/link";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface WhiskyBreadcrumbProps {
  region: string;
  distillery: string;
  independentDistillery: string;
}

export async function WhiskyBreadcrumb({ region, distillery, independentDistillery }: WhiskyBreadcrumbProps) {

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link 
              href={`/distilleries?region=${region}`}
            >
              {region}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link 
              href={`/distilleries/${distillery}`}
            >
              {distillery}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {independentDistillery && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link 
                  href={`/distilleries/${independentDistillery}`}
                >
                  {independentDistillery}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}