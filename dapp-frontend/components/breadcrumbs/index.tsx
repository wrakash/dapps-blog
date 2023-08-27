import React from "react";

interface Breadcrumb {
  label: string;
  link?: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <nav className="text-sm font-medium text-gray-500 py-2">
      <ol className="list-none p-0 inline-flex">
        {breadcrumbs.map((breadcrumb, index) => (
          <li className="flex items-center" key={index}>
            {breadcrumb.link ? (
              <>
                <a href={breadcrumb.link} className="hover:underline">
                  {breadcrumb.label}
                </a>
                <span className="mx-1">{'>'}</span>
              </>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
