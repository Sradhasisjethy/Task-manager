import React , { useState }from 'react'
import Image from 'next/image';

// Define types for our data
type Status = 'Active' | 'Busy' | 'Away';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: Status;
  avatarUrl: string;
}

interface TeamMembersProps {
  members: TeamMember[];
}

// Status badge component
const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const statusStyles = {
    Active: 'bg-green-500 text-white',
    Busy: 'bg-red-500 text-white',
    Away: 'bg-yellow-500 text-white',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// Team member card component
const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="bg-[#0b102c] rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="relative w-20 h-20 mb-4">
        <Image 
          src={member.avatarUrl} 
          alt={member.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-white">{member.name}</h3>
      <p className="text-gray-400 mb-2">{member.role}</p>
      <p className="text-gray-400 text-sm mb-4">{member.email}</p>
      <StatusBadge status={member.status} />
    </div>
  );
};

// Filter dropdown component
const RoleFilter: React.FC<{ roles: string[], selectedRole: string, onChange: (role: string) => void }> = 
  ({ roles, selectedRole, onChange }) => {
  return (
    <div className="relative">
      <select 
        value={selectedRole} 
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none  border border-gray-300 rounded-md py-2 pl-3 pr-10 text-white bg-[#0b102c] leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Roles</option>
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};
// Main team members component
const TeamMembers: React.FC<TeamMembersProps> = ({ members }) => {
    const [selectedRole, setSelectedRole] = useState<string>('');
    
    // Extract unique roles for filtering
    const allRoles = Array.from(new Set(members.map(member => member.role)));
    
    // Filter members by selected role
    const filteredMembers = selectedRole 
      ? members.filter(member => member.role === selectedRole)
      : members;
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Team Members</h1>
            <p className="text-gray-400">Meet the TaskFlow team</p>
          </div>
          <RoleFilter 
            roles={allRoles} 
            selectedRole={selectedRole} 
            onChange={setSelectedRole} 
            
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    );
  };
  
  export default TeamMembers;

