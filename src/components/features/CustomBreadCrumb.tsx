'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ROUTES } from '@/types';
import { DonutIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const CustomBreadCrumb = () => {
  const currentPath = usePathname();
  const params = useParams();
  console.log(params.slug);
  const isActive = (path: string) => currentPath === path;
  // if (isActive(ROUTES.DASHBOARD)) {
  //   return null;
  // }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {!isActive(ROUTES.DASHBOARD) && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <DonutIcon fontSize={30} />
            </BreadcrumbSeparator>{' '}
          </>
        )}

        <BreadcrumbItem>
          {isActive(ROUTES.TRANSACTIONS) ? (
            <BreadcrumbPage>Transactions</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={ROUTES.TRANSACTIONS}>Transactions</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DonutIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          {!params.slug ? (
            isActive(ROUTES.NEW_TRANSACTION) ? (
              <BreadcrumbPage>New</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={ROUTES.NEW_TRANSACTION}>New Transaction</Link>
              </BreadcrumbLink>
            )
          ) : (
            <BreadcrumbPage>Update</BreadcrumbPage>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default CustomBreadCrumb;
