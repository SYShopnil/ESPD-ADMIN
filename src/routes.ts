/* eslint-disable */

import { lazy } from 'react';

const Dashboard = lazy(() => import('./pages/Home'));
const subjects = lazy(() => import('./pages/subjects'));
const teacherRequest = lazy(() => import('./pages/teacher-request'));
const detailRequestTeacher = lazy(() => import('./pages/teacher-request/details'));
const levels = lazy(() => import('./pages/levels'));
const faqs = lazy(() => import('./pages/Faqs'));
const testimonials = lazy(() => import('./pages/Testimonials'));
const examBoard = lazy(() => import('./pages/ExamBoard'));
const findTutor = lazy(() => import('./pages/FindTutor'));
const findTutorDetails = lazy(() => import('./pages/FindTutor/details'));
const students = lazy(() => import('./pages/Students'));
const teachers = lazy(() => import('./pages/Teachers'));
const testimonialDetails = lazy(() => import('./pages/Testimonials/details'));
const teacherDetails = lazy(() => import('./pages/Teachers/details'));
const studentDetails = lazy(() => import('./pages/Students/details'));
const review = lazy(() => import('./pages/Reviews'));
const levelDetails = lazy(() => import('./pages/levels/details'));
const settings = lazy(() => import('./pages/Settings'));
const blog = lazy(() => import('./pages/blogs'));
const blogDetails = lazy(() => import('./pages/blogs/details'));
const features = lazy(() => import('./pages/features'));
const featureDetails = lazy(() => import('./pages/features/details'));
const bookings = lazy(() => import('./pages/Book'));
const bookingDetails = lazy(() => import('./pages/Book/details'));


const routes = [
  { path: '/', element: Dashboard },

  { path: '/subjects', element: subjects },
  { path: '/teacher-request', element: teacherRequest },
  { path: '/teacher-request/details/:id', element: detailRequestTeacher },
  { path: '/level', element: levels },
  { path: '/faq', element: faqs },
  { path: '/testimonial', element: testimonials },
  { path: '/testimonial/details/:id', element: testimonialDetails },
  { path: '/exam-board', element: examBoard },
  { path: '/find-tutor', element: findTutor },
  { path: '/find-tutor/details/:id', element: findTutorDetails },
  { path: '/students', element: students },
  { path: '/teachers', element: teachers },
  { path: '/teacher/details/:id', element: teacherDetails },
  { path: '/student/details/:id', element: studentDetails },
  { path: '/review', element: review },
  { path: '/level/details/:id', element: levelDetails },
  { path: '/settings', element: settings },
  { path: '/blog', element: blog },
  { path: '/blog/details/:id', element: blogDetails },
  { path: '/features', element: features },
  { path: '/features/details/:location', element: featureDetails },
  { path: '/bookings', element: bookings },
  { path: '/bookings/details/:id', element: bookingDetails },



  /*{ path: '/client/create', element: createClient },
  { path: '/client/edit/:id', element: editClient },

  { path: '/project', element: project },
  { path: '/project/create', element: createProject },
  { path: '/project/edit/:id', element: editProject },

  { path: '/developer', element: developer },
  { path: '/developer/create', element: createDeveloper },
  { path: '/developer/edit/:id', element: editDeveloper },*/
];

export default routes;
