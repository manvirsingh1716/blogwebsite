import { NavItem } from '../types/navigation';

// Static navigation items for manually added pages
export const staticNavigationItems: NavItem[] = [
  {
    slug: 'exam-forum',
    title: 'Exam Forum',
    children: [
      {
        slug: 'exam-forum/recruitment-exams',
        title: 'Recruitment Exams',
        children: [
          {
            slug: 'exam-forum/recruitment-exams/group-a',
            title: 'Group A',
            children: [
              {
                slug: 'exam-forum/recruitment-exams/group-a/civil-services',
                title: 'Civil Services',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-a/upsc',
                title: 'UPSC',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-a/uppcs',
                title: 'UPPCS',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-a/mppsc',
                title: 'MPPSC',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-a/mpsc',
                title: 'MPSC',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-a/other-states',
                title: 'Other States',
                children: []
              }
            ]
          },
          {
            slug: 'exam-forum/recruitment-exams/group-b',
            title: 'Group B',
            children: [
              {
                slug: 'exam-forum/recruitment-exams/group-b/nda-cds',
                title: 'NDA/CDS',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-b/ssc-cgl',
                title: 'SSC (CGL)',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-b/state-ssc',
                title: 'State SSC',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-b/rbi',
                title: 'RBI',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-b/insurance-exams',
                title: 'Insurance Exams',
                children: []
              }
            ]
          },
          {
            slug: 'exam-forum/recruitment-exams/group-c-d',
            title: 'Group C&D',
            children: [
              {
                slug: 'exam-forum/recruitment-exams/group-c-d/railways',
                title: 'Railways',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-c-d/ssc-chsl',
                title: 'SSC (CHSL)',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-c-d/banking',
                title: 'Banking',
                children: []
              },
              {
                slug: 'exam-forum/recruitment-exams/group-c-d/agniveer',
                title: 'Agniveer',
                children: []
              }
            ]
          }
        ]
      },
      {
        slug: 'exam-forum/higher-education',
        title: 'Higher Education',
        children: [
          {
            slug: 'exam-forum/higher-education/national-level',
            title: 'National Level',
            children: [
              {
                slug: 'exam-forum/higher-education/national-level/cuet',
                title: 'CUET',
                children: []
              },
              {
                slug: 'exam-forum/higher-education/national-level/jee',
                title: 'JEE',
                children: []
              },
              {
                slug: 'exam-forum/higher-education/national-level/neet',
                title: 'NEET',
                children: []
              },
              {
                slug: 'exam-forum/higher-education/national-level/clat',
                title: 'CLAT',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];
