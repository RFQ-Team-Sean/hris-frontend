import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Define types based on database schema
enum EmploymentType {
  Regular = 'Regular',
  Contractual = 'Contractual',
  Part_time = 'Part_time',
  Temporary = 'Temporary',
  Consultant = 'Consultant'
}

enum PostingStatus {
  Draft = 'Draft',
  Published = 'Published',
  Closed = 'Closed',
  Filled = 'Filled'
}

interface JobListing {
  id: string;
  position_title: string;
  department: string;
  job_description: string;
  qualifications: string;
  technical_competencies?: string;
  salary_range?: string;
  employment_type: EmploymentType;
  num_vacancies: number;
  application_deadline: Date;
  posting_status: PostingStatus;
  location: string;
  created_at: Date;
  responsibilities?: string;
  benefits?: string;
  department_description?: string;
}

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.scss'
})
export class JobSearchComponent implements OnInit {
  searchQuery: string = '';
  departmentFilter: string = 'All';
  employmentTypeFilter: string = 'All';
  locationFilter: string = 'All';

  // Filters options
  departments: string[] = ['All', 'IT', 'Human Resources', 'Finance', 'Marketing', 'Operations', 'Research & Development'];
  employmentTypes: string[] = ['All', ...Object.values(EmploymentType)];
  locations: string[] = ['All', 'Main Office', 'Remote', 'Branch Office', 'Hybrid'];

  // Mock job listings data
  allJobs: JobListing[] = [];
  filteredJobs: JobListing[] = [];
  featuredJobs: JobListing[] = [];

  // Job detail view
  selectedJob: JobListing | null = null;
  showJobDetail: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.initializeJobListings();
    this.filterJobs();
  }

  initializeJobListings(): void {
    // Mock data for job listings
    this.allJobs = [
      {
        id: 'JOB-2023-001',
        position_title: 'Software Engineer',
        department: 'IT',
        job_description: 'Design, develop, and implement software applications to support our business needs. Collaborate with cross-functional teams to define requirements.',
        qualifications: 'Bachelor\'s degree in Computer Science or related field. 3+ years of software development experience.',
        technical_competencies: 'JavaScript, TypeScript, Angular, Node.js, SQL',
        salary_range: '$80,000 - $120,000',
        employment_type: EmploymentType.Regular,
        num_vacancies: 2,
        application_deadline: new Date('2023-12-31'),
        posting_status: PostingStatus.Published,
        location: 'Main Office',
        created_at: new Date('2023-10-01'),
        responsibilities: `
          - Design, develop, and maintain high-quality software applications
          - Write clean, efficient, and well-documented code
          - Collaborate with cross-functional teams to define, design, and ship new features
          - Identify and correct bottlenecks and fix bugs
          - Help maintain code quality, organization, and automatization
          - Participate in code reviews and contribute to team discussions
          - Continuously discover, evaluate, and implement new technologies to maximize development efficiency
        `,
        benefits: `
          - Competitive salary and performance bonuses
          - Health, dental, and vision insurance
          - 401(k) matching
          - Flexible work hours and remote work options
          - Professional development stipend
          - Generous paid time off
        `,
        department_description: `
          The IT department at our company is responsible for maintaining our technical infrastructure and developing innovative software solutions for both internal use and our customers. Our team works in an agile environment and values collaboration, innovation, and continuous learning.
        `
      },
      {
        id: 'JOB-2023-002',
        position_title: 'HR Specialist',
        department: 'Human Resources',
        job_description: 'Provide HR support for recruitment, onboarding, and employee relations. Maintain employee records and assist with benefits administration.',
        qualifications: 'Bachelor\'s degree in HR, Business, or related field. 2+ years of HR experience.',
        employment_type: EmploymentType.Regular,
        num_vacancies: 1,
        application_deadline: new Date('2023-12-15'),
        posting_status: PostingStatus.Published,
        location: 'Main Office',
        created_at: new Date('2023-10-05'),
        responsibilities: `
          - Assist with recruitment and selection processes
          - Administer employee benefits programs
          - Maintain accurate HR records and documentation
          - Support new employee onboarding and orientation
          - Handle employee relations issues with professionalism and confidentiality
          - Support HR projects and initiatives
          - Ensure compliance with employment laws and regulations
        `,
        benefits: `
          - Competitive salary
          - Comprehensive benefits package
          - Professional development opportunities
          - Work-life balance initiatives
          - Employee assistance program
        `,
        department_description: `
          The Human Resources department is committed to attracting, developing, and retaining top talent. We strive to create a positive work environment where employees can thrive and contribute to the company's success.
        `
      },
      {
        id: 'JOB-2023-003',
        position_title: 'Financial Analyst',
        department: 'Finance',
        job_description: 'Analyze financial data to prepare reports and forecasts. Evaluate business performance and recommend improvements.',
        qualifications: 'Bachelor\'s degree in Finance, Accounting, or related field. 2+ years of financial analysis experience.',
        salary_range: '$70,000 - $90,000',
        employment_type: EmploymentType.Regular,
        num_vacancies: 1,
        application_deadline: new Date('2023-12-20'),
        posting_status: PostingStatus.Published,
        location: 'Main Office',
        created_at: new Date('2023-10-10'),
        responsibilities: `
          - Perform financial analysis and reporting
          - Develop and maintain financial models
          - Support budget planning and forecasting
          - Analyze business performance metrics
          - Identify trends and provide insights to management
          - Participate in financial planning activities
          - Support audit and compliance requirements
        `,
        benefits: `
          - Competitive compensation package
          - Health and retirement benefits
          - Paid time off
          - Professional certification support
          - Career advancement opportunities
        `,
        department_description: `
          The Finance department provides strategic financial guidance to the organization. We are responsible for financial planning, analysis, reporting, and ensuring the company's financial health and stability.
        `
      },
      {
        id: 'JOB-2023-004',
        position_title: 'Marketing Coordinator',
        department: 'Marketing',
        job_description: 'Assist in planning and executing marketing campaigns. Monitor performance metrics and prepare reports.',
        qualifications: 'Bachelor\'s degree in Marketing or related field. 1+ years of marketing experience.',
        employment_type: EmploymentType.Part_time,
        num_vacancies: 1,
        application_deadline: new Date('2023-12-25'),
        posting_status: PostingStatus.Published,
        location: 'Remote',
        created_at: new Date('2023-10-15'),
        responsibilities: `
          - Support the planning and execution of marketing campaigns
          - Assist with content creation for various channels
          - Monitor and report on campaign performance
          - Coordinate with external vendors and partners
          - Maintain marketing calendar and materials
          - Support event planning and coordination
          - Conduct market research as needed
        `,
        benefits: `
          - Flexible work schedule
          - Remote work option
          - Professional development support
          - Creative work environment
          - Collaborative team culture
        `,
        department_description: `
          The Marketing department is responsible for building and maintaining the company's brand, driving customer acquisition, and supporting business growth through strategic marketing initiatives.
        `
      },
      {
        id: 'JOB-2023-005',
        position_title: 'Full Stack Developer',
        department: 'IT',
        job_description: 'Develop and maintain web applications. Work with front-end and back-end technologies to deliver high-quality software.',
        qualifications: 'Bachelor\'s degree in Computer Science or related field. 4+ years of full stack development experience.',
        technical_competencies: 'React, Node.js, MongoDB, AWS',
        salary_range: '$90,000 - $130,000',
        employment_type: EmploymentType.Regular,
        num_vacancies: 3,
        application_deadline: new Date('2024-01-15'),
        posting_status: PostingStatus.Published,
        location: 'Remote',
        created_at: new Date('2023-10-20'),
        responsibilities: `
          - Design and implement both front-end and back-end components
          - Build reusable code and libraries for future use
          - Ensure the technical feasibility of UI/UX designs
          - Optimize applications for maximum performance and scalability
          - Collaborate with cross-functional teams
          - Implement security and data protection measures
          - Stay updated with emerging technologies
        `,
        benefits: `
          - Competitive compensation with equity options
          - Full remote work flexibility
          - Comprehensive health benefits
          - Professional development budget
          - Latest equipment and tools
          - Flexible working hours
          - Regular team events and retreats
        `,
        department_description: `
          Our IT department drives technological innovation and develops solutions that power our business. We maintain a collaborative, inclusive environment where developers can grow their skills and make a significant impact.
        `
      },
      {
        id: 'JOB-2023-006',
        position_title: 'Project Manager',
        department: 'Operations',
        job_description: 'Lead cross-functional teams to deliver projects on time and within budget. Develop project plans and track progress.',
        qualifications: 'Bachelor\'s degree in Business or related field. PMP certification preferred. 5+ years of project management experience.',
        salary_range: '$85,000 - $120,000',
        employment_type: EmploymentType.Contractual,
        num_vacancies: 2,
        application_deadline: new Date('2024-01-10'),
        posting_status: PostingStatus.Published,
        location: 'Hybrid',
        created_at: new Date('2023-10-25'),
        responsibilities: `
          - Lead project planning and execution from initiation to delivery
          - Manage project scope, schedule, and budget
          - Coordinate cross-functional teams and resources
          - Identify and mitigate project risks
          - Track and report project progress to stakeholders
          - Ensure project deliverables meet quality standards
          - Facilitate effective communication across teams
        `,
        benefits: `
          - Competitive contract rates
          - Flexible hybrid work arrangement
          - Opportunity for contract extension or permanent role
          - Professional development support
          - Collaborative work environment
        `,
        department_description: `
          The Operations department ensures the efficient execution of business processes and projects. We focus on optimization, quality, and delivering results that drive the organization forward.
        `
      },
      {
        id: 'JOB-2023-007',
        position_title: 'Research Scientist',
        department: 'Research & Development',
        job_description: 'Conduct research and develop innovative solutions. Collaborate with cross-functional teams to implement findings.',
        qualifications: 'Ph.D. in a relevant scientific field. 3+ years of research experience.',
        employment_type: EmploymentType.Regular,
        num_vacancies: 1,
        application_deadline: new Date('2024-01-20'),
        posting_status: PostingStatus.Published,
        location: 'Main Office',
        created_at: new Date('2023-10-30'),
        responsibilities: `
          - Design and conduct experiments to develop new products or improve existing ones
          - Analyze data and interpret research findings
          - Document research methodologies, results, and conclusions
          - Collaborate with cross-functional teams to implement research findings
          - Stay current with scientific advancements in the field
          - Present findings to stakeholders and at scientific conferences
          - Contribute to intellectual property development
        `,
        benefits: `
          - Competitive salary and research funding
          - Publication and patent incentives
          - Conference attendance support
          - State-of-the-art research facilities
          - Collaboration with academic institutions
          - Flexible work arrangements
        `,
        department_description: `
          The Research & Development department is at the forefront of innovation in our industry. We invest in groundbreaking research to develop solutions that address current challenges and anticipate future needs.
        `
      }
    ];

    // Set featured jobs
    this.featuredJobs = this.allJobs.slice(0, 3);

    // Initialize filtered jobs
    this.filteredJobs = [...this.allJobs];
  }

  filterJobs(): void {
    this.filteredJobs = this.allJobs.filter(job => {
      // Search query filter
      const matchesSearch = this.searchQuery === '' ||
        job.position_title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.job_description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (job.technical_competencies &&
          job.technical_competencies.toLowerCase().includes(this.searchQuery.toLowerCase()));

      // Department filter
      const matchesDepartment = this.departmentFilter === 'All' ||
        job.department === this.departmentFilter;

      // Employment type filter
      const matchesEmploymentType = this.employmentTypeFilter === 'All' ||
        job.employment_type === this.employmentTypeFilter;

      // Location filter
      const matchesLocation = this.locationFilter === 'All' ||
        job.location === this.locationFilter;

      return matchesSearch && matchesDepartment && matchesEmploymentType && matchesLocation;
    });
  }

  viewJobDetails(job: JobListing): void {
    this.selectedJob = job;
    this.showJobDetail = true;
    // Scroll to top when showing job detail
    window.scrollTo(0, 0);
  }

  closeJobDetail(): void {
    this.showJobDetail = false;
    this.selectedJob = null;
  }

  applyForJob(jobId: string): void {
    console.log(`Applying for job with ID: ${jobId}`);
    // Navigate to job application page with job ID
    // this.router.navigate(['/job-portal/job-application'], { queryParams: { jobId } });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.departmentFilter = 'All';
    this.employmentTypeFilter = 'All';
    this.locationFilter = 'All';
    this.filterJobs();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  daysUntilDeadline(deadline: Date): number {
    const today = new Date();
    const timeDiff = deadline.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}
