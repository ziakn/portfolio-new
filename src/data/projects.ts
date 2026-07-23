import { getDb } from './db';

export interface Project {
  id: number;
  title: string;
  category: string;
  href: string | null;
  img: string;
  description: string;
  sortOrder: number;
}

export interface ProjectInput {
  title: string;
  category: string;
  href?: string | null;
  img: string;
  description: string;
  sortOrder?: number;
}

interface ProjectRow {
  id: number;
  title: string;
  category: string;
  href: string | null;
  img: string;
  description: string;
  sort_order: number;
}

function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    href: row.href,
    img: row.img,
    description: row.description,
    sortOrder: row.sort_order,
  };
}

export function listProjects(): Project[] {
  const rows = getDb()
    .prepare('SELECT * FROM projects ORDER BY sort_order ASC, id ASC')
    .all() as ProjectRow[];
  return rows.map(toProject);
}

export function getProject(id: number): Project | undefined {
  const row = getDb().prepare('SELECT * FROM projects WHERE id = ?').get(id) as
    | ProjectRow
    | undefined;
  return row ? toProject(row) : undefined;
}

export function projectCategories(): string[] {
  const rows = getDb()
    .prepare('SELECT DISTINCT category FROM projects ORDER BY category')
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}

export function countProjects(): number {
  const row = getDb().prepare('SELECT COUNT(*) AS c FROM projects').get() as { c: number };
  return row.c;
}

function nextSortOrder(): number {
  const row = getDb().prepare('SELECT COALESCE(MAX(sort_order), 0) AS m FROM projects').get() as {
    m: number;
  };
  return row.m + 10;
}

export function createProject(input: ProjectInput): number {
  const info = getDb()
    .prepare(
      `INSERT INTO projects (title, category, href, img, description, sort_order)
       VALUES (@title, @category, @href, @img, @description, @sort_order)`,
    )
    .run({
      title: input.title,
      category: input.category,
      href: input.href?.trim() || null,
      img: input.img,
      description: input.description,
      sort_order: input.sortOrder ?? nextSortOrder(),
    });
  return Number(info.lastInsertRowid);
}

export function updateProject(id: number, input: ProjectInput): void {
  getDb()
    .prepare(
      `UPDATE projects SET
         title=@title, category=@category, href=@href, img=@img,
         description=@description, sort_order=@sort_order, updated_at=datetime('now')
       WHERE id=@id`,
    )
    .run({
      id,
      title: input.title,
      category: input.category,
      href: input.href?.trim() || null,
      img: input.img,
      description: input.description,
      sort_order: input.sortOrder ?? 0,
    });
}

export function deleteProject(id: number): void {
  getDb().prepare('DELETE FROM projects WHERE id = ?').run(id);
}
