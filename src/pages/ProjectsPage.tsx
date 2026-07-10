import { useState } from 'react';
import Sidebar from '../components/UserDashboard/Sidebar';
import TopBar from '../components/UserDashboard/TopBar';
import type { FilterTab } from '../components/Projects';
import type { ProjectCard as ProjectCardData } from '../components/Projects/types';
import {
  projects,
  ProjectsHeader,
  ProjectsToolbar,
  ProjectsGrid,
  ProjectPreview,
  NewProjectModal,
  EditProjectModal,
  DeleteProjectModal,
} from '../components/Projects';
import type { NewProjectFormData, EditProjectFormData } from '../components/Projects';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [previewProject, setPreviewProject]   = useState<ProjectCardData | null>(null);
  const [editProject, setEditProject]         = useState<ProjectCardData | null>(null);
  const [deleteProject, setDeleteProject]     = useState<ProjectCardData | null>(null);
  const [showNewProject, setShowNewProject]   = useState(false);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Active' && (p.status === 'Active' || p.status === 'Processing' || p.status === 'Scheduled')) ||
      activeFilter === p.status;

    return matchesSearch && matchesFilter;
  });

  const findProject = (id: string) => projects.find((p) => p.id === id) ?? null;

  const handleNewProject = () => setShowNewProject(true);

  const handleView = (id: string) => setPreviewProject(findProject(id));

  const handleEdit = (id: string) => {
    setPreviewProject(null);
    setEditProject(findProject(id));
  };

  const handleDelete = (id: string) => {
    setPreviewProject(null);
    setDeleteProject(findProject(id));
  };

  const handleNewProjectSubmit = (_data: NewProjectFormData) => {
    // TODO: POST /api/projects with _data, then refetch projects list
  };

  const handleEditSubmit = (_id: string, _data: EditProjectFormData) => {
    // TODO: PATCH /api/projects/:_id with _data, then refetch
  };

  const handleDeleteConfirm = (_id: string) => {
    // TODO: DELETE /api/projects/:_id, then refetch projects list
  };

  return (
    <div className="dashboard-layout flex h-screen w-screen overflow-hidden bg-[#060606]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-none">

            <ProjectsHeader
              totalCount={projects.length}
              activeCount={projects.filter((p) => p.status === 'Active').length}
              onNewProject={handleNewProject}
            />

            <ProjectsToolbar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {searchQuery && (
              <p className="text-[12px] text-white/30 mb-4">
                {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}

            <ProjectsGrid
              projects={filteredProjects}
              searchQuery={searchQuery}
              onNewProject={handleNewProject}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
            />

          </div>
        </main>
      </div>

      <ProjectPreview
        project={previewProject}
        onClose={() => setPreviewProject(null)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <NewProjectModal
        open={showNewProject}
        onClose={() => setShowNewProject(false)}
        onSubmit={handleNewProjectSubmit}
      />

      <EditProjectModal
        project={editProject}
        onClose={() => setEditProject(null)}
        onSubmit={handleEditSubmit}
      />

      <DeleteProjectModal
        project={deleteProject}
        onClose={() => setDeleteProject(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
