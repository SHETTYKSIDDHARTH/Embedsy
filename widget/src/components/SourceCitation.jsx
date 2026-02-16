export default function SourceCitation({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="embedsy-source-citation">
      Based on {sources.length} source{sources.length > 1 ? 's' : ''} from documentation
    </div>
  );
}