import { ReactNode } from "react";

export const modalContentMap: Record<string, ReactNode> = {
  fiskil: (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-2">Key Features</h4>
      <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
        <li>Real-time transaction monitoring</li>
        <li>Bank integration with open banking</li>
        <li>Data visualizations for insights</li>
      </ul>
    </div>
  ),
  anotherProject: (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-2">Challenges Overcome</h4>
      <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
        <li>Handled complex API integrations</li>
        <li>Designed system architecture from scratch</li>
        <li>Test-driven development with Cypress</li>
      </ul>
    </div>
  ),
  thirdProject: (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-2">Highlights</h4>
      <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
        <li>SEO-optimized and fully responsive</li>
        <li>Deployed on Vercel with CI/CD</li>
        <li>Used Prisma with PostgreSQL for DB</li>
      </ul>
    </div>
  ),
};